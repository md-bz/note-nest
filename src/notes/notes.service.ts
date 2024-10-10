import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./schemas/note.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  create(createNoteDto: CreateNoteDto, userId: mongoose.Types.ObjectId) {
    const createdNote = new this.noteModel({ ...createNoteDto, user: userId });
    return createdNote.save();
  }

  findAll(userId: mongoose.Types.ObjectId) {
    return this.noteModel.find({ user: userId }).exec();
  }

  findOne(id: string, userId: mongoose.Types.ObjectId) {
    return this.noteModel.findOne({ user: userId, _id: id }).exec();
  }

  update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: mongoose.Types.ObjectId,
  ) {
    return this.noteModel
      .findOneAndUpdate({ user: userId, _id: id }, updateNoteDto)
      .exec();
  }

  remove(id: string, userId: mongoose.Types.ObjectId) {
    return this.noteModel.findOneAndDelete({ user: userId, _id: id }).exec();
  }
}
