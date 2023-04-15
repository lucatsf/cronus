import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  senha: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  empresaId?: number;

  empresa?: Empresa
}
