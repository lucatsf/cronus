import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { PrismaService } from 'src/database/PrismaService';
import { Usuario } from '../usuario/entities/usuario.entity';
import { endOfDay, startOfDay, sub } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';


@Injectable()
export class RegistroService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegistroDto) {
    const { entrada, latitude, longitude, usuarioId } = data;
    const dataTimezone = utcToZonedTime(new Date(), process.env.TIMEZONE);
    const dataAjustada = sub(dataTimezone, { hours: parseInt(process.env.TIMEZONE_OFFSET) });
    const registro = this.prisma.registro.create({
      data: {
        data: dataAjustada,
        entrada,
        latitude,
        longitude,
        usuarioId,
      },
    })
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
        orderBy: {
          id: 'desc',
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
      orderBy: {
        id: 'desc',
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

  async generateMonthlyReport(usuarioId: number, dataInit: string, dataEnd: string) {
    const inicio = startOfDay(new Date(dataInit));
    const fim = endOfDay(new Date(dataEnd));
    const registros = await this.prisma.registro.findMany({
      where: {
        data: {
          gte: inicio,
          lte: fim,
        },
        usuarioId,
      },
      orderBy: {
        data: 'asc',
      },
    });

    const horasTrabalhadasPorDia: { [key: string]: number } = {};
    let registrosFormatados: any[] = [];
    let horasTotalMes = 0;
    let diasTrabalhados = 0;
    registros.forEach((registro) => {
      const dataString = registro.data.toLocaleDateString();

      if (!horasTrabalhadasPorDia[dataString]) {
        horasTrabalhadasPorDia[dataString] = 0;
        diasTrabalhados++; // incrementa o contador de dias trabalhados
      }
      if (registro.entrada) {
        const proximoRegistro = registros.find(
          (r) => r.usuarioId === registro.usuarioId && r.data > registro.data && r.entrada === false
        );
        if (proximoRegistro) {
          const diff = proximoRegistro.data.getTime() - registro.data.getTime();
          horasTrabalhadasPorDia[dataString] += diff / (1000 * 60 * 60);
        }
        horasTotalMes += parseFloat(horasTrabalhadasPorDia[dataString].toFixed(4));
      }
      registrosFormatados.push({
        editado: registro.editado,
        data: registro.data,
        entrada: registro.entrada,
        horasTrabalhadas: horasTrabalhadasPorDia[dataString],
      });
    });

    const usuario = await this.prisma.usuario.findUnique({ where: { id: usuarioId } });
    const valorHora = 50.02; //NOTE: valor fixo para teste
    const aReceber = valorHora * horasTotalMes;

    return {
      nome: usuario.nome,
      email: usuario.email,
      horasTotalMes,
      diasTrabalhados,
      valorHora,
      aReceber,
      registros: registrosFormatados,
    };
  }
}
