import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDTO {
  @ApiProperty({
    description: 'The original URL to be shortened',
    example: 'https://www.example.com',
  })
  originalUrl: string;
}
