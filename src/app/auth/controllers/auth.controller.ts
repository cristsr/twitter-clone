import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('profile')
  profile(user) {
    return user;
  }
}
