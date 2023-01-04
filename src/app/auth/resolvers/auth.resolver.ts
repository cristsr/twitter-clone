import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'app/user/user.dto';

@Resolver(() => User)
export class AuthResolver {
  @Query(() => User)
  user() {
    return {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: '',
    };
  }
}
