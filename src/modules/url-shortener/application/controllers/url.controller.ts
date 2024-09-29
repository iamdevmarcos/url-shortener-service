import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUrlDTO } from '../dto/create-url.dto';
import { UrlResponseDTO } from '../dto/url-response.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('urls')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Throttle({ default: { limit: 10, ttl: 60 } })
  @Post()
  @ApiOperation({ summary: 'Shorten a long URL' })
  @ApiBody({ type: CreateUrlDTO })
  @ApiResponse({
    status: 201,
    description: 'URL successfully shortened.',
    type: UrlResponseDTO,
  })
  @ApiResponse({ status: 400, description: 'Invalid URL provided.' })
  async shortenUrl(@Body() createUrlDto: CreateUrlDTO) {
    const url = await this.urlService.shortenUrl(createUrlDto.originalUrl);
    return { shortUrl: url.shortUrl, createdAt: url.createdAt };
  }

  @Throttle({ default: { limit: 10, ttl: 60 } })
  @Get('/:shortUrl')
  @ApiOperation({
    summary: 'Get a originalUrl by a shortUrl provided.',
  })
  @ApiParam({ name: 'shortUrl', description: 'The shortened URL' })
  @ApiResponse({
    status: 404,
    description: 'Shortened URL not found.',
  })
  async getOriginalUrl(@Param('shortUrl') shortUrl: string) {
    const url = await this.urlService.findUrlByShortCode(shortUrl);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.urlService.incrementUrlClicks(shortUrl);
    return { originalUrl: url.originalUrl, createdAt: url.createdAt };
  }

  @Throttle({ default: { limit: 10, ttl: 60 } })
  @Get('/stats/:shortUrl')
  @ApiOperation({ summary: 'Get statistics about a shortened URL' })
  @ApiParam({ name: 'shortUrl', description: 'The shortened URL' })
  @ApiResponse({
    status: 200,
    description: 'URL statistics retrieved successfully.',
    type: UrlResponseDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Shortened URL not found.',
  })
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
