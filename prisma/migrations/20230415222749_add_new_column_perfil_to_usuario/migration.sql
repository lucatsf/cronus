-- CreateEnum
CREATE TYPE "EnumPerfil" AS ENUM ('ADMIN', 'USUARIO', 'ROOT');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "perfil" "EnumPerfil" NOT NULL DEFAULT 'USUARIO';
