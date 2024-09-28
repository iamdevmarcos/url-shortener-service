import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './infrastructure/database/url.schema';
import { CacheService } from './infrastructure/cache/cache.service';
import { UrlController } from './application/controllers/url.controller';
import { UrlService } from './application/services/url.service';
import { UrlRepository } from './domain/repositories/url.repository';

const features = [{ name: Url.name, schema: UrlSchema }];

@Module({
  imports: [MongooseModule.forFeature([...features])],
  controllers: [UrlController],
  providers: [
    UrlService,
    CacheService,
    { provide: UrlRepository, useClass: UrlRepository },
  ],
})
export class UrlShortenerModule {}
