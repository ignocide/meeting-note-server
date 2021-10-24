import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create({ userForm: createUserDto });
  }

  @Post('/validate')
  async validateUser(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.validatePassword(loginUserDto);
  }
}
