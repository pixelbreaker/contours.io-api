import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { compare } from 'bcryptjs';
// import { BCRYPT_SALT_ROUNDS } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, candidatePassword: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (user) {
      const match = await compare(candidatePassword, user.password);

      if (match) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user._id };
    // const refreshToken = randtoken.generate(128);
    // this.usersService.update(user._id, {
    //   refreshToken,
    // });
    return {
      access_token: this.jwtService.sign(payload),
      // refresh_token: refreshToken,
    };
  }
}
