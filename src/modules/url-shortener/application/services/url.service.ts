import { Injectable } from '@nestjs/common';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { Url } from '../../infrastructure/database/url.schema';
import { nanoid } from 'nanoid';
import { UrlRepositoryInterface } from '../../domain/repositories/url.repository.interface';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepositoryInterface,
    private readonly cacheService: CacheService,
  ) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    const shortUrl = nanoid(6);
    const newUrl = this.urlRepository.createUrl(originalUrl, shortUrl);

    await this.cacheService.set(shortUrl, JSON.stringify(newUrl));
    return newUrl;
  }

  async findUrlByShortCode(shortUrl: string): Promise<Url | null> {
    const cachedUrl = await this.cacheService.get(shortUrl);
    if (cachedUrl) return JSON.parse(cachedUrl);

    const url = await this.urlRepository.findUrlByShortCode(shortUrl);
    if (url) {
      await this.cacheService.set(shortUrl, JSON.stringify(url));
    }

    return url;
  }

  async incrementUrlClicks(shortUrl: string): Promise<void> {
    await this.urlRepository.incrementClicks(shortUrl);
  }
}
