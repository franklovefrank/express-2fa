import createHttpError from 'http-errors';
import isEmail from 'validator/lib/isEmail';

import type { UsersCreateBody } from '../../types/routes/users';

export const validateCreateBody = (body: Partial<UsersCreateBody>) => {
    const { username, email, mobile, password } = body;

    if (!username) {
        throw createHttpError(400, 'Username required');
    }
    if (username.length < 5) {
        throw createHttpError(400, 'Username must contain at least 5 characters');
    }

    if (!mobile) {
        throw createHttpError(400, 'mobile required');
    }
    // if (!isMobilePhone(mobile)) {
    //     throw createHttpError(400, 'Mobile phone is invalid');
    // }

    if (!email) {
        throw createHttpError(400, 'Email required');
    }
    if (!isEmail(email)) {
        throw createHttpError(400, 'Email is invalid');
    }

    if (!password) {
        throw createHttpError(400, 'Password required');
    }
    if (password.length < 8) {
        throw createHttpError(400, 'Password must contain at least 8 characters');
    }

    // As the function checked the properties are not missing,
    // return the body as original type
    return body as UsersCreateBody;
};