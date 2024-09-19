export interface AuthLoginBody {
    login: string;
    password: string;
}

export interface AuthLoginResponse {
    id: string,
    username: string,
    email: string,
}

export interface AuthVerifyCodeBody {
    mobile: string;
    code: string;
}


export interface AuthVerifyResponse {
    message: string;
}