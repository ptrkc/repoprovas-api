import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import Professor from "./Professor";

@Entity("disciplines")
export default class Discipline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    semester: number;

    @ManyToMany(() => Professor, { cascade: true })
    @JoinTable()
    professors: Professor[];
}
