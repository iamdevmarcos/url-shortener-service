import { Url } from '../entities/url.entity';

export interface UrlRepositoryInterface {
  createUrl(originalUrl: string, shortUrl: string): Promise<Url>;
  findUrlByShortCode(shortUrl: string): Promise<Url | null>;
  incrementClicks(shortUrl: string): Promise<void>;
}
