import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from "@nestjs/common";

import { equal } from "assert";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  loginController(@Request() req) {
    return this.authService.login(req.user);
  }
}
