import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  description: string;
}
