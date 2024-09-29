import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from '../../infrastructure/cache/cache.service';
import { Url } from '../../infrastructure/database/url.schema';
import {
  URL_REPOSITORY,
  UrlRepositoryInterface,
} from '../../domain/repositories/url.repository.interface';

@Injectable()
export class UrlService {
  constructor(
    @Inject(URL_REPOSITORY)
    private readonly urlRepository: UrlRepositoryInterface,
    private readonly cacheService: CacheService,
  ) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    const { nanoid } = await import('nanoid');
    const shortUrl = nanoid(6);

    console.log(
      `Generated shortUrl: ${shortUrl} for originalUrl: ${originalUrl}`,
    );

    const newUrl = await this.urlRepository.createUrl(originalUrl, shortUrl);

    if (newUrl) {
      console.log(`Successfully created URL in DB: ${JSON.stringify(newUrl)}`);
    } else {
      console.log(`Failed to create URL for originalUrl: ${originalUrl}`);
    }

    console.log(`Saving URL in cache with shortUrl: ${shortUrl}`);
    await this.cacheService.set(shortUrl, JSON.stringify(newUrl));

    return newUrl;
  }

  async findUrlByShortCode(shortUrl: string): Promise<Url | null> {
    const cachedUrl = await this.cacheService.get(shortUrl);
    if (cachedUrl) {
      console.log(`Found URL in cache: ${cachedUrl}`);
      return JSON.parse(cachedUrl);
    }

    console.log(`Cache miss for shortUrl: ${shortUrl}, looking in DB`);
    const url = await this.urlRepository.findUrlByShortCode(shortUrl);

    if (url) {
      console.log(`Found URL in DB: ${JSON.stringify(url)}`);
      console.log(`Saving URL in cache with shortUrl: ${shortUrl}`);
      await this.cacheService.set(shortUrl, JSON.stringify(url));
    } else {
      console.log(`URL not found in DB for shortUrl: ${shortUrl}`);
    }

    return url;
  }

  async incrementUrlClicks(shortUrl: string): Promise<void> {
    console.log(`Incrementing clicks for shortUrl: ${shortUrl}`);
    await this.urlRepository.incrementClicks(shortUrl);
    console.log(`Successfully incremented clicks for shortUrl: ${shortUrl}`);
  }
}
