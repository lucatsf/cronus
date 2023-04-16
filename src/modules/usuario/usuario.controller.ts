import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';
import PermissionGuard from 'src/permission/roles.guard';
import { Role } from 'src/permission/enums/role.enum';

@Controller('usuario')
@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Post()
  @UseGuards(PermissionGuard(Role.ADMIN))
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(PermissionGuard(Role.ADMIN))
  findAll(
    @Query('page') page: number = 1, @Query('take') take: number = 20, @Query() filtros: { nome?: string; empresaId?: number } = {}
  ) {
    return this.usuariosService.findAll(page, take, filtros);
  }


  @Get(':id')
  @UseGuards(PermissionGuard(Role.ADMIN))
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Role.ADMIN))
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Role.ROOT))
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
