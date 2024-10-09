import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "src/users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneEmail(email);

    if (user && (await bcrypt.compare(pass, user.password)) == true) {
      return user;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { id: user._id };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
