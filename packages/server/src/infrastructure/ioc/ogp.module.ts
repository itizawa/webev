import { Module } from '@nestjs/common';
import { OgpController } from 'src/presentation/controllers/ogp.controller';

import { OgpAdapter } from 'src/infrastructure/adapters/ogp.adapter';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';
import { OgpUseCase } from 'src/application/useCases/ogp.useCase';

@Module({
  imports: [],
  controllers: [OgpController],
  providers: [OgpUseCase, { provide: IOgpAdapter, useClass: OgpAdapter }],
})
export class OgpModule {}
