import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Task } from './task.schema';
import { User } from '../../user/schemas/user.schema';

export enum roleUser {
  'admin',
  'student',
  'teacher',
}

@Schema({ versionKey: false })
export class Course extends Document {
  @Prop({ type: String, unique: true })
  codeCourse: string;

  @Prop({ type: String })
  nameCourse: string;

  @Prop({
    type: Array<{ _id: ObjectId; role: roleUser }>,
    ref: User.name,
  })
  users: [{ user: User; role: roleUser }];

  @Prop({ type: Array<{ _id: ObjectId }>, ref: Task.name })
  tasks: [Task];

  @Prop({ type: [String], unique: true })
  topics: [string];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
