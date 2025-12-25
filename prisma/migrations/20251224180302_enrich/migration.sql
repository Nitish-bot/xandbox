/*
  Warnings:

  - You are about to drop the `Validators` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Validators";

-- CreateTable
CREATE TABLE "Nodes" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "lastSeenTimestamp" TIMESTAMP(3) NOT NULL,
    "pubkey" VARCHAR(44) NOT NULL,
    "rpcPort" INTEGER NOT NULL,
    "storageCommitted" BIGINT NOT NULL,
    "storageUsagePercent" INTEGER NOT NULL,
    "storageUsed" BIGINT NOT NULL,
    "uptime" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nodes_pubkey_key" ON "Nodes"("pubkey");

-- CreateIndex
CREATE INDEX "Nodes_pubkey_createdAt_idx" ON "Nodes"("pubkey", "createdAt" DESC);
