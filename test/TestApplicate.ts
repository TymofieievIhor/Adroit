import { INestApplication } from '@nestjs/common';

class TestApplicate {
    private app: INestApplication;
    public auth: {
        account_id: number;
        token: string;
    };
    public admin: Account;
    getApp(){
        return this.app;
    }
    setApp(app: INestApplication){
        this.app = app;
    }
    setAuth(auth){
        this.auth = auth;
    }
    getAuthId(){
        return this.auth.account_id;
    }
    getAuthToken(){
        return this.auth.token;
    }
}
const applicate = new TestApplicate();
export = applicate;