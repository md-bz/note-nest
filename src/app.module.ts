import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotesModule } from "./notes/notes.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forRoot(
      "mongodb://127.0.0.1:27017/NoteNest?directConnection=true&serverSelectionTimeoutMS=2000&appName=NoteNest",
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
