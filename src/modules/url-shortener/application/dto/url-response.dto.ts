import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDTO {
  @ApiProperty({
    description: 'The shortened URL',
    example: 'abc123',
  })
  shortUrl: string;

  @ApiProperty({
    description: 'The original URL that was shortened',
    example: 'https://www.example.com',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'Number of times the shortened URL has been accessed',
    example: 42,
  })
  clicks: number;

  @ApiProperty({
    description: 'Date when the URL was created',
    example: '2023-01-01T12:00:00Z',
  })
  createdAt: Date;
}
