import { Module } from '@nestjs/common';
import { OgpController } from 'src/presentation/controllers/ogp.controller';

import { OgpAdapter } from 'src/infrastructure/adapters/ogp.adapter';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';
import { FetchOgpUseCase } from 'src/application/useCases/ogp/fetchOgp.useCase';

@Module({
  imports: [],
  controllers: [OgpController],
  providers: [FetchOgpUseCase, { provide: IOgpAdapter, useClass: OgpAdapter }],
})
export class OgpModule {}
