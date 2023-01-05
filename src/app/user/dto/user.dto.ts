import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OmitInputType } from 'utils';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  fullname: string;

  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => [String])
  auth0Ids: string[];
}

@InputType()
export class UserInput extends OmitInputType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'auth0Ids',
]) {
  @Field()
  auth0Id: string;
}
