import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new HttpException(
        "Password and passwordConfirm don't match!",
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdNote = new this.userModel(createUserDto);

    return createdNote.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
