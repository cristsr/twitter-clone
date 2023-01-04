import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ENV } from '../env';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get(ENV.DB_URI),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
