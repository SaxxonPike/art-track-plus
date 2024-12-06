import {Express} from "express";
import sessionService from "../services/sessionService";
import authService from "../services/authService";
import responseService from "../services/responseService";

export class AuthController {
    install(app: Express) {
        app.post("/login", async (req, res) => {
            const session = await sessionService.retrieve(req);
            await authService.createToken(session.username);
            await responseService.respondSuccess(res, {
                token: session.token
            });
        });

        app.post("/logout", async (req, res) => {
            const session = await sessionService.retrieve(req);
            if (session) {
                await authService.destroyToken(session.username, session.token);
            }

            await responseService.respondSuccessWithoutData(res);
        });
    }
}

const service = new AuthController();
export default service;
