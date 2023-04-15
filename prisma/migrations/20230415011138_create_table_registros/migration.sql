-- CreateTable
CREATE TABLE "registros" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entrada" BOOLEAN NOT NULL,
    "editado" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "registros" ADD CONSTRAINT "registros_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
