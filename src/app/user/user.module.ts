import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'app/user/services';
import { UserResolver } from 'app/user/resolvers';
import { UserName, UserSchema } from 'app/user/entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserName, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
