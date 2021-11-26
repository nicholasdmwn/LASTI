import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Treatment } from '../../common/treatment';

@Entity({ name: 'patient' })
class PatientDAO {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'varchar',
        length: 512,
    })
    nama!: string;

    @Column({
        type: 'varchar',
        length: 32,
    })
    noTelp!: string;

    @Column({
        type: 'enum',
        enum: Treatment,
        default: Treatment.LAINNYA,
    })
    treatment!: Treatment;

    @Column({ nullable: true, type: 'timestamp' })
    masuk?: Date;

    @Column({ nullable: true, type: 'timestamp' })
    keluar?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @VersionColumn({
        name: 'entity_version',
        nullable: false,
        default: 0,
    })
    entityVersion!: number;

    constructor(nama: string, noTelp: string, treatment: Treatment) {
        this.nama = nama;
        this.noTelp = noTelp;
        this.treatment = treatment;
    }
}

export { PatientDAO };
