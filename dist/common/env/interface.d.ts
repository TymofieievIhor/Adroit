export interface IProcessEnv {
    [key: string]: string | undefined;
}
export interface IEnvVariables extends IProcessEnv {
    PORT: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    GLOBAL_TOKEN_SECRET: string;
    VERIFICATION_TOKEN_SECRET: string;
    CONFIRM_EMAIL_ACCOUNT: string;
    CONFIRM_EMAIL_PASSWORD: string;
    SWAGGER_HTTPS?: 'true';
    PROD_RUN?: string;
    LOCAL_RUN?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
    AWS_BUCKET: string;
}
