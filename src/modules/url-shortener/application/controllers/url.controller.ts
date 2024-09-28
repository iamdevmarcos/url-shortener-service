import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from '../services/url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async shortenUrl(@Body('originalUrl') originalUrl: string) {
    const url = await this.urlService.shortenUrl(originalUrl);
    return { shortUrl: url.shortUrl };
  }

  @Get('/:shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const url = await this.urlService.findUrlByShortCode(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.urlService.incrementUrlClicks(shortUrl);
    return res.redirect(url.originalUrl);
  }

  @Get('/stats/:shortUrl')
  async getStats(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlService.findUrlByShortCode(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return {
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    };
  }
}
