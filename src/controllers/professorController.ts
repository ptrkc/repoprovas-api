import { Request, Response } from "express";
import * as professorService from "../services/professorService";

export async function findById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const result = await professorService.findById(id);
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function find(req: Request, res: Response) {
    try {
        const result = await professorService.find();
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
}
