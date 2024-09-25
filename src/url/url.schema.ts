import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Url {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortUrl: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
