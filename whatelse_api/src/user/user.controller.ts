import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConnectedUser } from '@/src/db/user/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() dto: CreateUserDto): Promise<String> {
    return this.userService.create(dto);
  }

    @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<ConnectedUser> {
    return this.userService.login(dto);
  }

}
