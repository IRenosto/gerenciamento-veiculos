import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('veiculos')
export class Veiculo {

  @PrimaryColumn()
  id!: number;

  @Column()
  placa!: string;

  @Column()
  marca!: string;

  @Column()
  modelo!: string;

  @Column()
  ano!: number;

  @Column()
  cor!: string;

  @Column()
  dataCadastro!: Date;

  @Column()
  dataAtualizacao!: Date;
}
