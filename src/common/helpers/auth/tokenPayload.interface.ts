export interface IAccountTokenPayload {
    account: IAccountTokenData;
    client: IClientTokenData;
    account_type: string;
    driver: {id: number};
}

export interface IAccountTokenData {
    id: number;
    email: string;
    account_type_id?: number;
}

export interface IClientTokenData {
    id?: number;
    value?: number;
    name?: string;
    text_value?: string;
}
