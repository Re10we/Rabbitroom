import { Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create/:email/:password')
  createUserWithEmailAndPassword(
    @Param('email') email: string,
    @Param('password') password: string,
  ) {
    this.usersService.createUserWithEmailAndPassword(email, password);
  }
}
