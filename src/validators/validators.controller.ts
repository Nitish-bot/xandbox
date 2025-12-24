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
  create(@Body() createValidatorDto: Prisma.ValidatorsCreateInput) {
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
    @Body() updateValidatorDto: Prisma.ValidatorsUpdateInput,
  ) {
    return this.validatorsService.update(id, updateValidatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.validatorsService.remove(id);
  }
}
