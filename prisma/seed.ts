import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.usuario.upsert({
    where: { email: 'lucatsf@icloud.com' },
    update: {},
    create: {
      id: 1,
      nome: "Lucas",
      senha: "$2b$10$p/0Ot9.c6GcWixscMVhMgOk9EWN8M5OJtJhPmPd2vepaikegPrHnm",
      email: "lucatsf@icloud.com",
      perfil: "ROOT"
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
