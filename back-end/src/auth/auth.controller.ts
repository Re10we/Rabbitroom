import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/createUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/guard/auth.guard';

@Controller('auth')
@ApiTags('auth-controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  createUser(@Body() dto: UserDto) {
    return this.authService.create(dto);
  }

  @Post('signIn')
  signInUser(@Body() dto: UserDto) {
    return this.authService.signIn(dto);
  }

  @Get('refresh')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearerAuth')
  refreshToken(@Request() req) {}

  @Delete('delete')
  deleteUser(@Body() dto: UserDto) {
    return this.authService.deleteUser(dto);
  }

  @Delete('deleteAll')
  deleteAll() {
    return this.authService.deleteAll();
  }

  //TODO signOut

  /* TODO move to users */
  /*
  
  */
}
