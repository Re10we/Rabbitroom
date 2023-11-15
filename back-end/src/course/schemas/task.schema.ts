import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Task extends Document {
  @Prop({ type: String })
  owner: string;

  @Prop({ type: Date })
  dataOfCreate: Date;

  @Prop({ type: Date })
  timeOfDeadline: Date;

  @Prop({ type: String })
  header: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String] })
  files: [string];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
