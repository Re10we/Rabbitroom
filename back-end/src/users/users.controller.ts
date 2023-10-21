import { Controller, Post, Get, Param, Query, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUserWithEmailAndPassword(@Body() dto: CreateUserDto) {
    return this.usersService.createUserWithEmailAndPassword(
      dto.email,
      dto.password,
    );
  }

  @Post('signin')
  signInWithEmailAndPassword(@Body() dto: CreateUserDto) {
    return this.usersService.signInWithEmailAndPassword(
      dto.email,
      dto.password,
    );
  }

  @Post('singout')
  singOut() {
    return this.usersService.SignOut();
  }

  @Post('pop')
  get(@Query('email') email: string, @Query('password') password: string) {
    return 'Your email and password' + ' ' + email + ' ' + password;
  }
}
