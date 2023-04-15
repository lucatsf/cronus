import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class RegistroService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegistroDto) {
    return 'This action adds a new registro';
  }

  async findAll() {
    return `This action returns all registro`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} registro`;
  }

  async update(id: number, data: UpdateRegistroDto) {
    return `This action updates a #${id} registro`;
  }

  async remove(id: number) {
    return `This action removes a #${id} registro`;
  }
}
