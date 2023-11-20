import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/schemas/user.schema';

export class TaskDto {
  @ApiProperty({ type: 'string', required: false })
  title: string;

  @ApiProperty({ type: 'string', required: false })
  description: string;

  @ApiProperty({ type: 'date', required: false })
  due: Date;

  @ApiProperty({ type: 'string', format: 'number', required: false })
  maxPoints: number;

  @ApiProperty({ type: 'string', required: false })
  topic: string;

  @ApiProperty({ isArray: true, type: 'object', required: false })
  users: [{ user: User; points: number }];

  @ApiProperty({
    isArray: true,
    type: 'string',
    format: 'binary',
    required: false,
  })
  files: Array<Express.Multer.File>;

  @ApiProperty({ isArray: true, type: 'string', required: false })
  links: [string];
}
