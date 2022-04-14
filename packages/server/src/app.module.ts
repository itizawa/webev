import { Module } from '@nestjs/common';
import { OgpModule } from './infrastructure/ioc/ogp.module';

@Module({
  imports: [OgpModule],
})
export class AppModule {}
