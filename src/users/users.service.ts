import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
// import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import mongoose, { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new HttpException(
        "Password and passwordConfirm don't match!",
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.usersModel(createUserDto);

    try {
      await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        // Mongoose duplicate key error (11000 code)
        throw new ConflictException("User with that email already exists");
      } else {
        throw error;
      }
    }
    return createdUser;
  }

  findAll() {
    return this.usersModel.find();
  }

  findOneEmail(email: string) {
    return this.usersModel.findOne({ email });
  }
  findOneId(id: mongoose.Types.ObjectId) {
    return this.usersModel.findById(id);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return;
  // }

  // remove(id: number) {
  //   return;
  // }
}
