import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://renwie:ssas_bro@cluster0.7ey0tad.mongodb.net/rabbitroom?retryWrites=true&w=majority'),
    UserModule,
  ],
})
export class AppModule {}
