import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
}
