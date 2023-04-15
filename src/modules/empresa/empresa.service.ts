import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmpresaDto) {
    return this.prisma.empresa.create({ data });
  }

  async findAll() {
    return `This action returns all empresa`;
  }

  async findOne(id: number) {
    return this.prisma.empresa.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateEmpresaDto) {
    return this.prisma.empresa.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.empresa.delete({ where: { id } });
  }
}
