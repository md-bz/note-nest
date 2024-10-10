import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
// import bcrypt from "bcrypt";
import * as bcrypt from "bcrypt";

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre("save", async function () {
            this.password = await bcrypt.hash(this.password, 12);
          });
          return schema;
        },
      },
    ]),
  ],

  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
