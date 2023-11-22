import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  UseGuards,
  Param,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { Response, response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/createUser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/guard/auth.guard';

@Controller('auth')
@ApiTags('auth-controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUpUser(@Body() dto: UserDto) {
    return this.authService.signUp(dto);
  }

  @Post('signIn')
  async signInUser(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(dto);

    response
      .cookie('refreshToken', refresh_token, {
        secure: true, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'strict', // Adjust to your requirements
        maxAge:
          parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES) * 24 * 60 * 60 * 1000,
      })
      .cookie('accessToken', access_token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge:
          parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES) * 24 * 60 * 60 * 1000,
      })
      .sendStatus(200);
  }

  @Get('isStorageEmail/:email')
  validationEmail(@Param('email') email: string): Promise<boolean> {
    return this.authService.isStorageEmail(email);
  }

  @Get('isStorageUserName/:name')
  validationUserName(@Param('name') name: string): Promise<boolean> {
    return this.authService.isStorageUserName(name);
  }

  @Get('logOut')
  logOutUser(@Res() response: Response) {
    response
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .sendStatus(200);
  }

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
