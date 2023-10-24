import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(dto: UserDto): Promise<User> {
    const createdUser = await this.userModel.create(dto);

    return createdUser;
  }

  async signIn(dto: UserDto): Promise<User> {
    const foundUser = await this.userModel.findOne(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
    if (
      foundUser &&
      foundUser.password === dto.password &&
      foundUser.isSession === false
    ) {
      return foundUser.updateOne({ isSession: true });
    }

    return null;
  }

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
