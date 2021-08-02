import joi from "joi";
import { NewExam } from "../services/examService";

export function validateNewExam(newExam: NewExam) {
    const urlRegEx =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    const currentYear = new Date().getFullYear();

    const schema = joi.object({
        disciplineId: joi.number().integer().required(),
        professorId: joi.number().integer().required(),
        year: joi.number().integer().min(2010).max(currentYear).required(),
        semester: joi.number().integer().min(1).max(2).required(),
        typeId: joi.number().integer().min(1).max(5).required(),
        examURL: joi.string().trim().pattern(urlRegEx).required(),
    });
    const error = schema.validate(newExam).error;
    return error ? false : true;
}
