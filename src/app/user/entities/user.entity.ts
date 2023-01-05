import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { schemaFactory } from 'utils';
import { User } from 'app/user/dto';
import { IsDate, IsString } from 'class-validator';

export type UserDocument = HydratedDocument<UserEntity>;
export const UserName = 'User';
@Schema({ timestamps: true })
export class UserEntity implements User {
  @Prop()
  @IsString()
  id: string;

  @Prop([String])
  @IsString({ each: true })
  auth0Ids: string[];

  @Prop()
  @IsString()
  email: string;

  @Prop()
  @IsString()
  fullname: string;

  @Prop()
  @IsString()
  nickname: string;

  @Prop()
  @IsDate()
  createdAt: Date;

  @Prop({ default: null })
  @IsDate()
  updatedAt: Date;
}
export const UserSchema = schemaFactory(UserEntity);
