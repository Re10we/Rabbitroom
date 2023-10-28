import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { AuthGuard } from './guard/auth.guard';

@Controller('user')
@ApiTags('user-controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('changeName/:newName')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  changeNameUser(@Request() req, @Param('newName') newName: string) {
    //TODO change username
    const { username } = req.user;
    return req.user;
  }
}
