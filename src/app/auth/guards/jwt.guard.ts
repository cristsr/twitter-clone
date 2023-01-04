import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC } from 'app/auth/constants';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  #logger = new Logger(JwtGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * @override
   * @param context
   */
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }
    // WARNING: Skip authentication
    return true;

    return super.canActivate(context);
  }

  /**
   * @override
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const contextTypeMap = {
      http: () => context.switchToHttp().getRequest(),
      graphql: () => GqlExecutionContext.create(context).getContext().req,
    };

    const type = context.getType();
    return contextTypeMap[type]();
  }

  /**
   * @override
   * @param err
   * @param user
   * @param info
   * @param context
   */
  handleRequest(err, user, info, context) {
    if (!user) {
      this.#logger.error(info);
    }

    return super.handleRequest(err, user, info, context);
  }
}
