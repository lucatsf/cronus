import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateRegistroDto {
  @IsEmpty()
  @ApiProperty()
  data: Date;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  entrada: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  editado: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  longitude: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  usuarioId: number;
}
