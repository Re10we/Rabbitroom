import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/createUser.dto';
import { User } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: UserDto): Promise<User> {
    const candidate = await this.userModel.findOne({ email: dto?.email });

    if (candidate) {
      throw new UnauthorizedException();
    }

    //adding new user to db
    return await this.userModel.create(dto);
  }

  async signIn(
    dto: UserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const foundUser = await this.userModel.findOne(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
    if (foundUser == null) {
      throw new UnauthorizedException();
    }

    if (foundUser.password === dto.password) {
      const payload = { idUser: foundUser._id, username: foundUser.name };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
      });
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async isStorageEmail(email: string): Promise<boolean> {
    return (await this.userModel.findOne({ email: email })) != null;
  }

  async isStorageUserName(name: string): Promise<boolean> {
    return (await this.userModel.findOne({ name: name })) != null;
  }

  async deleteUser(dto: UserDto): Promise<User> {
    return await this.userModel.findOneAndRemove(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
  }

  async deleteAll() {
    await this.userModel.deleteMany({});
  }
}
