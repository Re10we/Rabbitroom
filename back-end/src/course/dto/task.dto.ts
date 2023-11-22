import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ type: 'string', required: true })
  title: string;

  @ApiProperty({ type: 'string', required: false })
  description: string;

  @ApiProperty({ type: 'date', required: false })
  due: Date;

  @ApiProperty({ type: 'string', format: 'number', required: false })
  maxPoints: number;

  @ApiProperty({ type: 'string', required: true })
  topic: string;

  @ApiProperty({ isArray: true, type: 'string', required: false })
  students: string[];

  @ApiProperty({
    isArray: true,
    type: 'string',
    format: 'binary',
    required: false,
  })
  files: Express.Multer.File[];

  @ApiProperty({ isArray: true, type: 'string', required: false })
  links: [string];
}
