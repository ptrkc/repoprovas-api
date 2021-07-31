import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Professor from "./Professor";
import Discipline from "./Discipline";
import ExamType from "./ExamType";

@Entity("exams")
export default class Exam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    semester: 1 | 2;

    @ManyToOne(() => ExamType, (type) => type.exams)
    type: ExamType;

    @ManyToOne(() => Professor, (professor) => professor.exams)
    professor: Professor;

    @ManyToOne(() => Discipline, (discipline) => discipline.exams)
    discipline: Discipline;

    @Column()
    url: string;
}
