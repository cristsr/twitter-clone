import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from 'app/user/services';
import { User, UserInput } from 'app/user/dto';
import { Observable } from 'rxjs';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  registerUser(@Args('data') data: UserInput): Observable<User> {
    return this.userService.register(data);
  }
}
