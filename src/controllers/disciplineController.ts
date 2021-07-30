import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService";

export async function findById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const result = await disciplineService.findById(id);
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
}

export async function find(req: Request, res: Response) {
    try {
        const result = await disciplineService.find();
        res.send(result);
    } catch (e) {
        res.sendStatus(500);
    }
}
