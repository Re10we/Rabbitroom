import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  owner: string;

  @ApiProperty()
  dataOfCreate: Date;

  @ApiProperty()
  timeOfDeadline: Date;

  @ApiProperty()
  header: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  files: [string];
}
