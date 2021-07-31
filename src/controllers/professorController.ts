import { Request, Response } from "express";
import * as professorService from "../services/professorService";

export async function findById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.sendStatus(400);
        }
        const result = await professorService.findById(id);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function findExamsByProfessorId(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.sendStatus(400);
        }
        const result = await professorService.findExamsByProfessorId(id);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function find(req: Request, res: Response) {
    try {
        const result = await professorService.find();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
