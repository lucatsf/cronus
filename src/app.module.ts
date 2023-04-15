import { Module } from '@nestjs/common';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { RegistroModule } from './modules/registro/registro.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EmpresaModule, UsuarioModule, RegistroModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
