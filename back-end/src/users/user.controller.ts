import { Controller, Post, Get, Body, Delete,Request, UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth.guard';

@Controller('users')
@ApiTags('users-controller')
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

  /* TODO move to users */   
  @Post('change')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  changeNameUser(@Request() req) {
    return req.user;
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
