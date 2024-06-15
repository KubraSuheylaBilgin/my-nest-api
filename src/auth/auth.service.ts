import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(eMail: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(eMail);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, eMail: user.eMail };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
