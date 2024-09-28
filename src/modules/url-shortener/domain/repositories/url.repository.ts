import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from '../../infrastructure/database/url.schema';
import { UrlRepositoryInterface } from '../../domain/repositories/url.repository.interface';
import { Url as UrlDomain } from '../../domain/entities/url.entity';
import { mapToDomain } from '../../infrastructure/database/url.mapper';

@Injectable()
export class UrlRepository implements UrlRepositoryInterface {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async createUrl(originalUrl: string, shortUrl: string): Promise<UrlDomain> {
    const newUrl = new this.urlModel({ originalUrl, shortUrl });
    const savedUrl = await newUrl.save();

    return mapToDomain(savedUrl);
  }

  async findUrlByShortCode(shortUrl: string): Promise<UrlDomain | null> {
    const url = await this.urlModel.findOne({ shortUrl });
    if (!url) {
      return null;
    }

    return mapToDomain(url);
  }

  async incrementClicks(shortUrl: string): Promise<void> {
    await this.urlModel.updateOne({ shortUrl }, { $inc: { clicks: 1 } });
  }
}
