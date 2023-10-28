import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
