export interface UsersCreateBody {
    username: string;
    mobile: string;
    email: string;
    password: string;
}

export interface UsersUpdateBody {
    desired_username?: string;
    desired_email?: string;
}

export interface PasswordUpdateBody {
    desired_password?: string;
}