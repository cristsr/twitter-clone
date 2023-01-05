import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from, map, Observable, tap } from 'rxjs';
import { Model } from 'mongoose';
import { User, UserInput } from 'app/user/dto';
import { UserDocument, UserName } from 'app/user/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserName)
    private userModel: Model<UserDocument>,
  ) {}

  register(data: UserInput): Observable<User> {
    const user = new this.userModel(data);
    return from(user.save()).pipe(
      map((res) => res.toObject()),
      tap((res) => console.log(res)),
    );
  }
}
