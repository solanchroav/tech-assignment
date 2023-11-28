import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGateway } from './gateways/api.gateway';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { PostHelperService } from './services/helpers/post-helper.service';

@Module({
  imports: [
    InMemoryDBModule.forRoot({}), 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ApiGateway,
    PostHelperService,
  ],
})
export class AppModule {}
