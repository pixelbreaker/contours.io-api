import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
// import { BCRYPT_SALT_ROUNDS } from '../constants';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, candidatePassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);

    if (user) {
      const match = await bcrypt.compare(candidatePassword, user.password);

      if (match) {
        const { password, ...result } = user;
        console.log(result);

        return result;
      }
      return null;
    }
    return null;
  }
}
