import type { Request } from 'express';
import 'express-session';
import type { User } from '../../src/entities/users';

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}

declare module 'express-session' {
    interface SessionData {
        userId?: string; 
        twoFAStatus?: boolean; 
    }
}

declare global {
    /**
    * Interface used to type request body.
    */
    interface TypedRequestBody<T> extends Request {
        body: Partial<T>; // Use Partial to set all properties optional because we cannot be sure the client will send all required properties
    }
}