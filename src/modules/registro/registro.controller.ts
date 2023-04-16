import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { AuthGuard } from '@nestjs/passport';
import PermissionGuard from 'src/permission/roles.guard';
import { Role } from 'src/permission/enums/role.enum';

@Controller('registro')
@UseGuards(AuthGuard('jwt'))
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @UseGuards(PermissionGuard(Role.USUARIO))
  create(@Body() createRegistroDto: CreateRegistroDto, @Req() req: any) {
    return this.registroService.create({
      ...createRegistroDto,
      usuarioId: req?.user?.id,
    });
  }

  @Get()
  @UseGuards(PermissionGuard(Role.USUARIO))
  findAll(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('take') take: number = 20,
    @Query() filtros: {
      nome?: string;
      dataInicio?: string;
      dataFim?: string;
      usuarioId?: number;
    } = {}
  ) {
    return this.registroService.findAll(
      page,
      take,
      {
        ...filtros,
      },
      req?.user
    );
  }

  @Get(':id')
  @UseGuards(PermissionGuard(Role.USUARIO))
  findOne(@Param('id') id: string) {
    return this.registroService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Role.ADMIN))
  update(@Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    return this.registroService.update(+id, updateRegistroDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Role.ADMIN))
  remove(@Param('id') id: string) {
    return this.registroService.remove(+id);
  }
}
