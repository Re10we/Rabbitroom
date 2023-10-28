import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://renwie:ssas_bro@cluster0.7ey0tad.mongodb.net/rabbitroom?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
