import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRegistroDto } from './create-registro.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRegistroDto extends PartialType(CreateRegistroDto) {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  id: number;
}
