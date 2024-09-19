import type { NextFunction, Request, Response } from 'express';
import type { HttpError } from 'http-errors';
import createHttpError from 'http-errors';
import passport from 'passport';

import type { AuthLoginBody, AuthLoginResponse, AuthVerifyCodeBody, AuthVerifyResponse } from '../../types/routes/auth';
import type { User } from '../../entities/user';
import { validateLoginBody } from './validators';
import { checkVerificationCode, createVerification } from '../../services/twilio';

const login = async (
    req: TypedRequestBody<AuthLoginBody>,
    res: Response<AuthLoginResponse>,
    next: NextFunction,
) => {
    validateLoginBody(req.body);

    passport.authenticate(
        'local',
        async (err: HttpError | null, user: User | undefined) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(createHttpError(401, 'Incorrect credentials'));
            }

            try {
                await new Promise<void>((resolve, reject) => {
                    req.logIn(user, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                        req.session.userId = user.id;
                        console.log(`Session ID: ${req.sessionID}`);
                        console.log(`User ID stored in session: ${user.id}`);
                    });
                });

                await createVerification(user.mobile);

                res.send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                });
            } catch (error) {
                next(createHttpError(500, 'Failed to send verification code'));
            }
        },
    )(req, res, next);
};


const verifyCode = async (
    req: Request<{}, {}, AuthVerifyCodeBody>,
    res: Response<AuthVerifyResponse>,
    next: NextFunction
) => {
    const { mobile, code } = req.body;

    console.log(`Session ID: ${req.sessionID}`);
    console.log(`Session User ID: ${req.session.userId}`);

    try {
        const isValid = await checkVerificationCode(mobile, code);

        if (!isValid) {
            return next(createHttpError(401, 'Invalid verification code'));
        }

        if (!req.session.userId) {
            return next(createHttpError(401, 'User session expired or not found'));
        }

        // Set the 2FA status in the session
        req.session.twoFAStatus = true;

        // Optionally, save the session explicitly (depends on your session store)
        req.session.save((err) => {
            if (err) {
                return next(createHttpError(500, 'Failed to save session'));
            }

            res.send({ message: '2FA completed successfully' });
        });

    } catch (error) {
        next(createHttpError(500, 'Failed to verify code'));
    }
};

const logout = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => res.send());
    });
};

const authenticated = (
    req: Request,
    res: Response,
) => {
    if (req.isAuthenticated()) {
        res.send('You are authenticated');
    } else {
        res.send('You are not authenticated');
    }
};

export default {
    login,
    verifyCode,
    logout,
    authenticated,
};
