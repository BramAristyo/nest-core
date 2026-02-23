import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address',
  })
  email: string;
}
