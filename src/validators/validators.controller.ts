import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ValidatorsService } from './validators.service';
import { Prisma } from 'prisma/generated/client';

@Controller('validators')
export class ValidatorsController {
  constructor(private readonly validatorsService: ValidatorsService) {}

  @Post()
  create(@Body() createValidatorDto: Prisma.NodesCreateInput) {
    return this.validatorsService.create(createValidatorDto);
  }

  @Get()
  findAll() {
    return this.validatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.validatorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNodes: Prisma.NodesUpdateInput,
  ) {
    return this.validatorsService.update(id, updateNodes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validatorsService.remove(id);
  }
}
