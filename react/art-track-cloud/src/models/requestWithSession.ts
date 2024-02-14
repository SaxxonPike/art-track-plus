import {Request} from "express";
import {SessionModel} from "./sessionModel";

export interface RequestWithSession extends Request {
    session: SessionModel
}