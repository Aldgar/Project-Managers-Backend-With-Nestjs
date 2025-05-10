import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Challenge extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
