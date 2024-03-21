import { Module } from '@nestjs/common';
import { NinjaService } from './ninja.service';
import { NinjaController } from './ninja.controller';

@Module({
  providers: [NinjaService],
  controllers: [NinjaController]
})
export class NinjaModule {}
