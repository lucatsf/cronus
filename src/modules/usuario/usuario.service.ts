import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUsuarioDto) {
    const { nome, email, senha } = data;
    return this.prisma.usuario.create({
      data: {
        nome,
        email,
        senha,
      },
    });
  }

  async findAll(page: number, take: number, filtros: { nome?: string; empresaId?: number } = {}) {
    const { nome, empresaId } = filtros;
    const skip = (page - 1) * take;
    const total = await this.prisma.usuario.count({
      where: {
        nome: {
          contains: nome,
        },
        empresaId: empresaId ? empresaId : undefined,
      },
    });
    const totalPages = Math.ceil(total / take);
    const usuarios = await this.prisma.usuario.findMany({
      take,
      skip,
      where: {
        nome: {
          contains: nome,
        },
        empresaId: empresaId ? empresaId : undefined,
      },
    });
    return {
      usuarios,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUsuarioDto) {
    const { nome, email, senha, empresaId } = data;
    return this.prisma.usuario.update({ where: { id }, data: { nome, email, senha, empresaId } });
  }

  async remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
