import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Task, TaskSchema } from './schemas/task.schema';
import { CourseController } from './course.controller';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
