import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }
}
