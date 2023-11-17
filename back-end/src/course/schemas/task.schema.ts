import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({ versionKey: false })
export class Task extends Document {
  @Prop({ type: String })
  owner: string;

  @Prop({ type: Date })
  dataOfCreate: Date;

  @Prop({ type: Date })
  timeOfDeadline: Date;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  maxPoints: number;

  @Prop({ type: [String], unique: true })
  topic: [String];

  @Prop({
    type: Array<{ _id: ObjectId; points: Number }>,
    ref: User.name,
  })
  users: [{ user: User; points: number }];

  @Prop({ type: [String] })
  files: [string];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
