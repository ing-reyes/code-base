import { Response } from "express";
import { ManagerError } from "./manager.error";

export class HandlerError {
    static error(error: unknown, res: Response) {
        if (error instanceof ManagerError) {
            res.status(error.code).json({ message: error.message, status: error.status, code: error.code })
            return
        }
        res.status(500).json({ message: 'Internal Server Error', status: "INTERNAL_SERVER_ERROR", code: 500 })
    }
}