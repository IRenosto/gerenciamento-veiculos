import { Veiculo } from "../database/entities";

export interface IParamsId { id?: number;  [key: string]: any; }

export interface IBodyPropsVeiculos extends Omit<Veiculo, 'id' | 'dataCadastro' | 'dataAtualizacao' > {}

export interface IQueryGetAllVeiculos {
    page?: number;
    limit?: number;
    filter?: string;
}