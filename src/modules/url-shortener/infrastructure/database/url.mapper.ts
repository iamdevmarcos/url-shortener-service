import { Url as UrlDomain } from '../../domain/entities/url.entity';
import { Url as UrlSchema } from './url.schema';

export function mapToDomain(urlSchema: UrlSchema): UrlDomain {
  const urlDomain = new UrlDomain(urlSchema.originalUrl, urlSchema.shortUrl);
  urlDomain.clicks = urlSchema.clicks;
  urlDomain.createdAt = urlSchema.createdAt;
  return urlDomain;
}
