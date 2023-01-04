import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { ENV } from 'env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  #logger = new Logger(JwtStrategy.name);

  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.get(ENV.AUTH0_ISSUER) + '/.well-known/jwks.json',
      }),
      audience: config.get(ENV.AUTH0_AUDIENCE),
      issuer: config.get(ENV.AUTH0_ISSUER) + '/',
      algorithms: ['RS256'],
    });
  }

  async validate(payload): Promise<boolean> {
    this.#logger.debug(payload);

    const auth0Id = (payload.sub as string).split('|').pop();

    return true;
  }
}
