import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ValidatorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createValidator: Prisma.NodesCreateInput) {
    return this.databaseService.nodes.create({
      data: createValidator,
    });
  }

  async createMany(createValidator: Prisma.NodesCreateInput[]) {
    return this.databaseService.nodes.createMany({
      data: createValidator,
    });
  }

  async findAll() {
    return this.databaseService.nodes.findMany({
      distinct: ['pubkey'],
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.nodes.findUnique({
      where: {
        id,
      },
    });
  }

  async findLatestPublicIp() {
    return this.databaseService.nodes.findMany({
      where: {
        isPublic: true,
      },
      distinct: ['pubkey'],
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        ipAddress: true,
        rpcPort: true,
      },
    });
  }

  async update(id: string, updateValidator: Prisma.NodesUpdateInput) {
    return this.databaseService.nodes.update({
      data: updateValidator,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.nodes.delete({
      where: {
        id,
      },
    });
  }
}
