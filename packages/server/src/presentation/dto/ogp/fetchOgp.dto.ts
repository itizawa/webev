// import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class FetchOgpDto {
  //   @ApiProperty({
  //     description: '取得する対象のurl',
  //     default: 'https://onn-hr.com/',
  //   })
  @IsUrl({}, { message: 'urlは正しい形式である必要があります' })
  url: string;
}
