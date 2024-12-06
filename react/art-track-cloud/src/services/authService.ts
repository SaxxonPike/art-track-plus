import {LoginInfoModel} from "../models/loginInfoModel";
import {TokenInfoModel} from "../models/tokenInfoModel";

export class AuthService {
    public async getLoginInfo(username: string): Promise<LoginInfoModel> {
        // TODO: this
        return {
            username: username,
            password: "",
            admin: false,
            tenant: "def456"
        };
    }

    public async getTokenInfo(username: string, token: string): Promise<TokenInfoModel> {
        // TODO: this
        return {
            username: username,
            token: token,
            admin: false,
            tenant: "def456"
        };
    }

    public async createToken(username: string) {
        // TODO: this
        return "abc123";
    }

    public async destroyToken(username: string, token: string) {
        // TODO: this
    }
}

const service = new AuthService();
export default service;
