import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, Matches } from "class-validator";
import { RegexHelper } from "src/helpers/regex.helper";

type EnumPerfil = 'ADMIN' | 'USUARIO' | 'ROOT';

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
  @Matches(RegexHelper.senha, { message: 'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais' })
  @ApiProperty()
  senha: string;

  @IsOptional()
  @IsString()
  @Matches(/^(ADMIN|USUARIO|ROOT)$/, { message: 'O perfil deve ser ADMIN, USUARIO' })
  @ApiProperty()
  perfil: EnumPerfil;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  empresaId?: number;

  empresa?: Empresa
}
