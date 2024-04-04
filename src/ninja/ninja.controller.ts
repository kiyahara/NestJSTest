import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';

// GET /ninja?type=fast --> []
@Controller('ninja')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}

  @Get()
  getNinja(@Query('weapon') weapon: string) {
    try {
      return this.ninjaService.getNinjas(weapon);
    } catch (err) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Weapon Not Found',
      });
    }
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (err) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Ninja Not Found',
      });
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.removeNinja(id);
  }
}
