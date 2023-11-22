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

  @Post('changeName/:newName')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  changeNameUser(@Request() req, @Param('newName') newName: string) {
    //TODO change username
    return req.user;
  }

  @Get('inSession')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  isSession() {
    return true;
  }

  @Get('userName')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  getUserName(@Request() req) {
    //TODO change username
    const { username } = req.user;
    return username;
  }

  @Get('userEmail')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  getUserEmail(@Request() req) {
    //TODO change username
    const { username } = req.user;
    const email = this.userService.getUserEmail(username);
    return email;
  }
}
