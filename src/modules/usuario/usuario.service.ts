import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/database/PrismaService';
import { hash } from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUsuarioDto) {
    const { nome, email, senha } = data;
    const hashPassword = await hash(senha, 10);
    const user = await this.prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashPassword,
      },
    });
    return {
      nome: user.nome,
      email: user.email,
    };
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
      select: {
        id: true,
        nome: true,
        email: true,
        empresa: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return {
      usuarios,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        empresa: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateUsuarioDto) {
    const { nome, email, senha } = data;
    const user = await this.prisma.usuario.update({ where: { id }, data: { nome, email, senha } });
    return {
      nome: user.nome,
      email: user.email,
    }
  }

  async remove(id: number) {
    this.prisma.usuario.delete({ where: { id } });
  }
}
