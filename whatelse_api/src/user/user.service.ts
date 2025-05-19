import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import createUser from '@/src/db/user/createUser';
import { CreateUserInput, ConnectedUser } from '@/src/db/user/user.types';
import loginUser from '@/src/db/user/loginUser';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  async create(dto: CreateUserDto): Promise<string> {
    return createUser(dto);
  }

  async login(dto: LoginUserDto): Promise<ConnectedUser> {
    return loginUser(dto);
  }
}