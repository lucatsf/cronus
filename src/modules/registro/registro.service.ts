import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { PrismaService } from 'src/database/PrismaService';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class RegistroService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegistroDto) {
    const { entrada, latitude, longitude, usuarioId } = data;
    const registro = await this.prisma.registro.create({
      data: {
        data: new Date(),
        entrada,
        latitude,
        longitude,
        usuarioId,
      },
    });
    return registro;
  }

  async findAll(
    page: number,
    take: number,
    filtros: {
      nome?: string;
      dataInicio?: string;
      dataFim?: string;
      usuarioId?: number;
    } = {},
    usuario: Usuario
  ) {
    if (usuario?.perfil === 'ADMIN') {
      const { dataInicio, dataFim, usuarioId } = filtros;
      const skip = (page - 1) * take;
      const total = await this.prisma.registro.count({
        where: {
          data: {
            gte: dataInicio ? new Date(dataInicio) : undefined,
            lte: dataFim ? new Date(dataFim) : undefined,
          },
          usuarioId: usuarioId ? Number(usuarioId) : undefined,
        },
      });
      const totalPages = Math.ceil(total / take);
      const registros = await this.prisma.registro.findMany({
        skip,
        take,
        where: {
          data: {
            gte: dataInicio ? new Date(dataInicio) : undefined,
            lte: dataFim ? new Date(dataFim) : undefined,
          },
          usuarioId: usuarioId ? Number(usuarioId) : undefined,
        },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
      return {
        registros,
        totalPages,
        currentPage: page,
      };
    }
    const { dataInicio, dataFim } = filtros;
    const skip = (page - 1) * take;
    const total = await this.prisma.registro.count({
      where: {
        data: {
          gte: dataInicio ? new Date(dataInicio) : undefined,
          lte: dataFim ? new Date(dataFim) : undefined,
        },
        usuarioId: usuario.id,
      },
    });
    const totalPages = Math.ceil(total / take);
    const registros = await this.prisma.registro.findMany({
      skip,
      take,
      where: {
        data: {
          gte: dataInicio ? new Date(dataInicio) : undefined,
          lte: dataFim ? new Date(dataFim) : undefined,
        },
        usuarioId: usuario.id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
    return {
      registros,
      totalPages,
      currentPage: page,
    };
  }

  async findOne(id: number) {
    return this.prisma.registro.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdateRegistroDto) {
    return this.prisma.registro.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.registro.delete({
      where: {
        id,
      },
    });
  }
}
