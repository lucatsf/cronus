import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UsuarioService } from './usuario.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService]
})
export class UsuarioModule {}
