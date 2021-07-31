import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Exam from "./Exam";

@Entity("examType")
export default class ExamType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Exam, (exam) => exam.type)
    exams: Exam[];
}
