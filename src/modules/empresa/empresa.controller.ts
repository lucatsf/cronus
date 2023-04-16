import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/permission/enums/role.enum';
import PermissionGuard from 'src/permission/roles.guard';

@Controller('empresa')
@UseGuards(AuthGuard('jwt'))
@ApiTags('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  @UseGuards(PermissionGuard(Role.ROOT))
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  @UseGuards(PermissionGuard(Role.ROOT))
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionGuard(Role.ADMIN))
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      return { error: 'Id must be a number' };
    }
    return this.empresaService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard(Role.ROOT))
  update(@Param('id') id: number, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(+id, updateEmpresaDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard(Role.ROOT))
  remove(@Param('id') id: string) {
    return this.empresaService.remove(+id);
  }
}
