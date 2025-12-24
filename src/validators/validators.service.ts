import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ValidatorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createValidator: Prisma.ValidatorsCreateInput) {
    return this.databaseService.validators.create({
      data: createValidator,
    });
  }

  async createMany(createValidator: Prisma.ValidatorsCreateInput[]) {
    return this.databaseService.validators.createMany({
      data: createValidator,
    });
  }

  async findAll() {
    return this.databaseService.validators.findMany({
      distinct: ['pubkey'],
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.validators.findUnique({
      where: {
        id,
      },
    });
  }

  async findLatestPublicIp() {
    return this.databaseService.validators.findMany({
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

  async update(id: string, updateValidator: Prisma.ValidatorsUpdateInput) {
    return this.databaseService.validators.update({
      data: updateValidator,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.validators.delete({
      where: {
        id,
      },
    });
  }
}
