import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, Matches } from "class-validator";
import { RegexHelper } from "src/helpers/regex.helper";

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegexHelper.senha)
  @ApiProperty()
  senha: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  empresaId?: number;

  empresa?: Empresa
}
