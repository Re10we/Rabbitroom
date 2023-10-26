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
 
  async deleteUser(dto: UserDto): Promise<User> {
    return await this.userModel.findOneAndRemove(
      dto.email ? { email: dto.email } : { name: dto.name },
    );
  }

  async deleteAll() {
    await this.userModel.deleteMany({});
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
