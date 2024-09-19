import createHttpError from 'http-errors';

import type { AuthLoginBody, AuthVerifyCodeBody } from '../../types/routes/auth';

export const validateLoginBody = (body: Partial<AuthLoginBody>) => {
    const { login, password } = body;

    if (!login) {
        throw createHttpError(400, 'Username or email address required');
    }

    if (!password) {
        throw createHttpError(400, 'Password required');
    }

    // As the function checked the properties are not missing,
    // return the body as original type
    return body as AuthLoginBody;
};

export const validateTwoFactorBody = (body: Partial<AuthVerifyCodeBody>) => {
    const { mobile, code } = body;

    if (!mobile || typeof mobile !== 'string') {
        throw createHttpError(400, 'Mobile number is required and must be a string');
    }

    if (!code || typeof code !== 'string') {
        throw createHttpError(400, 'Verification code is required and must be a string');
    }

    return body as AuthVerifyCodeBody;
};