import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/createUser.dto';
import { User } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ExceptionDto } from 'src/dto/exception.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: UserDto): Promise<ExceptionDto | User> {
    const candidate = await this.userModel.findOne({ email: dto?.email });

    if (candidate) {
      return { code: 200, description: 'this email is storage' };
    }

    //adding new user to db
    return await this.userModel.create(dto);
  }

  async signIn(dto: UserDto): Promise<ExceptionDto | string> {
    const foundUser = await this.userModel.findOne(
      dto.email ? { email: dto.email } : { name: dto.name },
    );

    if (foundUser?.password === dto.password) {
      const payload = { idUser: foundUser._id, username: foundUser.name };

      return await this.jwtService.signAsync(payload);
    } else {
      return { code: 200, description: 'password uncorrected' };
    }
  }

  async validationEmail(email: string): Promise<boolean> {
    return (await this.userModel.findOne({ email: email })) != null;
  }

  async validationUserName(name: string): Promise<boolean> {
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
