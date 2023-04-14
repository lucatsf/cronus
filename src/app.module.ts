import { Module } from '@nestjs/common';
import { EmpresaModule } from './modules/empresa/empresa.module';

@Module({
  imports: [EmpresaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
