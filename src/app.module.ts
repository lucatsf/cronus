import { Module } from '@nestjs/common';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RegistroModule } from './modules/registro/registro.module';

@Module({
  imports: [EmpresaModule, UsuarioModule, RegistroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
