/*
  Warnings:

  - A unique constraint covering the columns `[authToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN "authToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Token_authToken_key" ON "Token"("authToken");
