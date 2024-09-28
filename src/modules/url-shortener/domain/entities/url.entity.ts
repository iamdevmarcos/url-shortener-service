export class Url {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;

  constructor(originalUrl: string, shortUrl: string) {
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.clicks = 0;
    this.createdAt = new Date();
  }

  incrementClicks() {
    this.clicks += 1;
  }
}
