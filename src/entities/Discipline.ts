import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm";
import Exam from "./Exam";
import Professor from "./Professor";

@Entity("disciplines")
export default class Discipline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    semester: number;

    @ManyToMany(() => Professor)
    @JoinTable()
    professors: Professor[];

    @OneToMany(() => Exam, (exam) => exam.discipline)
    exams: Exam[];
}
