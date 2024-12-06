import bcrypt from "bcrypt";
import authService from "../services/authService";
import {Express} from "express";
import responseService from "../services/responseService";
import sessionService from "../services/sessionService";

export class AuthMiddleware {
    install(app: Express) {
        app.use(async (req, res, next) => {

            // Always allow the main path.
            if (!req.path || req.path == "/") {
                return next();
            }

            // Retrieve username/password from header.
            const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
            const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

            // Logout path will always succeed, even if the token is not valid.
            if (req.path == "/logout" && req.method == "POST") {
                await sessionService.inject(req, {
                    username: login,
                    token: password,
                    admin: false
                });
                return next();
            }

            // Different rules for the auth path.
            // Basic auth uses "username:password" here.
            if (req.path == "/login" && req.method == "POST") {

                // Verify username/hash.
                const loginInfo = await authService.getLoginInfo(login);
                if (loginInfo && await bcrypt.compare(password, loginInfo.password)) {
                    // Success.
                    await sessionService.inject(req, {
                        username: loginInfo.username,
                        tenant: loginInfo.tenant,
                        admin: loginInfo.admin
                    });
                    return next();
                }

                await responseService.respondUnauthorized(res);
                return;
            }

            // Standard rules for all other paths.
            // Basic auth uses "username:token" here.
            const tokenInfo = await authService.getTokenInfo(login, password);
            if (tokenInfo) {
                // Success.
                await sessionService.inject(req, {
                    username: tokenInfo.username,
                    tenant: tokenInfo.tenant,
                    token: tokenInfo.token,
                    admin: tokenInfo.admin
                });
                return next();
            }

            // User hasn't passed authentication, fail.
            await responseService.respondUnauthorized(res);
            return;
        });
    }
}

const service = new AuthMiddleware();
export default service;
