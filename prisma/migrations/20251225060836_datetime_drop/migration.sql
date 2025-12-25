/*
  Warnings:

  - Changed the type of `lastSeenTimestamp` on the `Nodes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Nodes" DROP COLUMN "lastSeenTimestamp",
ADD COLUMN     "lastSeenTimestamp" INTEGER NOT NULL;
