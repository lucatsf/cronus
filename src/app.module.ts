import { Module } from '@nestjs/common';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [EmpresaModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
