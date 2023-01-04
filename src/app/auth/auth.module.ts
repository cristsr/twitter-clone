import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from 'app/auth/guards';
import { JwtStrategy } from 'app/auth/strategies';
import { AuthResolver } from 'app/auth/resolvers';
import { AuthController } from 'app/auth/controllers';

@Module({
  imports: [PassportModule.register({})],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    AuthResolver,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
