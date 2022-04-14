import { Controller, Get, Query } from '@nestjs/common';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FetchOgpUseCase } from 'src/application/useCases/ogp/fetchOgp.useCase';
import { FetchOgpDto } from 'src/presentation/dto/ogp/fetchOgp.dto';

// @ApiTags('Legacy')
@Controller('/ogp')
export class OgpController {
  constructor(private readonly fetchOgpUseCase: FetchOgpUseCase) {}

  @Get('/')
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     description: 'Success to fetch OGP',
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.BAD_REQUEST,
  //     description: 'Fail to fetch OGP',
  //   })
  //   @ApiOperation({ summary: 'URLをもとにサイトのOGPを取得します' })
  async fetchOgp(
    @Query() query: FetchOgpDto,
  ): Promise<{ [key: string]: string }> {
    return await this.fetchOgpUseCase.fetchOgp(query.url);
  }
}
