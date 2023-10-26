import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(dto: UserDto): Promise<object | User> {
    const candidate = await this.userModel.findOne({ email: dto?.email });
    //TODO structure for exception-
    if (candidate) {
      return { value: 'Candidate is null' };
    }

    const createdUser = await this.userModel.create(dto);

    return createdUser;
  }

  async signIn(dto: UserDto) {
    const foundUser = await this.userModel.findOne(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
    if (foundUser?.password === dto.password) {
      const payload = { idUser: foundUser._id, username: foundUser.name };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return { error: 'error SignIn' };
  }
  /* TODO MidlWare
  async changeName(access_token: string) {
    console.log(access_token);
    try {
      const { username } = this.jwtService.verify(access_token);

      const foundUser = await this.userModel.findOne({ name: username });

      return await foundUser.updateOne({ name: 'glek' });
    } catch (ExceptionsHandler) {
      console.log('ERROR [ExceptionsHandler] invalid signature');
    }
  }
  */

  async deleteUser(dto: UserDto): Promise<User> {
    return await this.userModel.findOneAndRemove(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
  }

  async deleteAll() {
    const currentCountDocuments = await this.userModel.countDocuments();
    for (let docCount = 0; docCount < currentCountDocuments; docCount++) {
      await this.userModel.findOneAndDelete();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
