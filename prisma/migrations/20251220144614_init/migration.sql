-- CreateTable
CREATE TABLE "Validators" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "lastSeenTimestamp" BIGINT NOT NULL,
    "pubkey" TEXT NOT NULL,
    "rpcPort" INTEGER NOT NULL,
    "storageCommitted" BIGINT NOT NULL,
    "storageUsagePercent" INTEGER NOT NULL,
    "storageUsed" BIGINT NOT NULL,
    "uptime" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Validators_pkey" PRIMARY KEY ("id")
);
