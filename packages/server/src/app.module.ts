import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OgpModule } from './infrastructure/ioc/ogp.module';

@Module({
  imports: [OgpModule],
  providers: [AppService],
})
export class AppModule {}
