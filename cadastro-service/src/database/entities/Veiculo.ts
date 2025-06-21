import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('veiculos')
export class Veiculo {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id!: number;

    @Column({ type: 'varchar', length: 10, unique: true })
    placa!: string;

    @Column({ type: 'varchar', length: 50 })
    marca!: string;

    @Column({ type: 'varchar', length: 50 })
    modelo!: string;

    @Column({ type: 'int' })
    ano!: number;

    @Column({ type: 'varchar', length: 30 })
    cor!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCadastro!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    dataAtualizacao!: Date;
}
