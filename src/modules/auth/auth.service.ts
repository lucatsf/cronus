import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor (private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
  async validateUser(email: string, senha: string): Promise<any> {
    let usuario: Usuario;
    try {
      usuario = await this.prisma.usuario.findUnique({
        where: {
          email,
        },
        include: {
          empresa: true,
        },
      });

      if (!usuario) {
        return null;
      }

      const senhaValida = compareSync(senha, usuario?.senha);

      if (!senhaValida) {
        return null;
      }

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        empresa: usuario?.empresa,
      };
    } catch (error) {
      return null;
    }
  }

  async login(user: Usuario) {
    const payload = { email: user.email, perfil: user.perfil, sub: user.id };
    return {
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        empresa: user?.empresa,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
