import { Request, Response } from "express";
import * as professorService from "../services/professorService";

export async function find(req: Request, res: Response) {
    try {
        const result = await professorService.find();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
