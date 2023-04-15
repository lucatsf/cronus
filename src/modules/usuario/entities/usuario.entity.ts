import { Empresa } from "src/modules/empresa/entities/empresa.entity";

export class Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  empresaId?: number;
  empresa?: Empresa;
}
