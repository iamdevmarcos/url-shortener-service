import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './url.schema';

const features = [{ name: Url.name, schema: UrlSchema }];

@Module({
  imports: [MongooseModule.forFeature([...features])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
