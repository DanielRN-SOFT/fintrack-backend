/*
  Warnings:

  - You are about to drop the column `tipo` on the `transacciones` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `tipo` ENUM('Ingreso', 'Egreso') NOT NULL;

-- AlterTable
ALTER TABLE `transacciones` DROP COLUMN `tipo`;
