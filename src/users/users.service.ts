import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import mongoose, { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new HttpException(
        "Password and passwordConfirm don't match!",
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.usersModel(createUserDto);

    try {
      //todo: this doesnt catch the err
      return createdUser.save();
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        // Mongoose duplicate key error (11000 code)
        throw new ConflictException("User with this email already exists");
      }
    }
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return;
  }

  remove(id: number) {
    return;
  }
}
