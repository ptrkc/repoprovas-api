import { Request, Response } from "express";
import * as examService from "../services/examService";

export async function findById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.sendStatus(400);
        }
        const result = await examService.findById(id);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function post(req: Request, res: Response) {
    try {
        const result = await examService.post(req.body);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.status(201).send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function findByProfessorId(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.sendStatus(400);
        }
        const result = await examService.findByProfessorId(id);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function findByDisciplineId(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.sendStatus(400);
        }
        const result = await examService.findByDisciplineId(id);
        if (typeof result === "number") {
            return res.sendStatus(result);
        }
        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
