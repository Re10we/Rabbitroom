import { Controller, Post, Get, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create')
  createUser(@Body() dto: UserDto) {
    return this.usersService.create(dto);
  }

  @Post('sign')
  signInUser(@Body() dto: UserDto) {
    return this.usersService.signIn(dto);
  }

  @Delete('delete')
  deleteUser(@Body() dto: UserDto) {
    return this.usersService.deleteUser(dto);
  }

  @Delete('deleteAll')
  deleteAll() {
    return this.usersService.deleteAll();
  }

  @Get('all')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  /*

  @Post('signin')
  signInWithEmailAndPassword(@Body() dto: IUsersDto) {
    return this.usersService.signIn(dto.email, dto.password);
  }

  @Post('singout')
  singOut() {
    return this.usersService.signOut();
  }
  */
}
