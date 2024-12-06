import {Request} from "express";
import {RequestWithSession} from "../models/requestWithSession";
import {SessionModel} from "../models/sessionModel";

class SessionService {
    public async inject(req: Request, session: SessionModel) {
        const reqSession = <RequestWithSession> req;
        reqSession.session = session;
    }

    public async retrieve(req: Request) {
        const reqSession = <RequestWithSession> req;
        return reqSession.session;
    }
}

const service = new SessionService();
export default service;
