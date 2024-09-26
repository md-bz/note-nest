import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./schemas/note.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  create(createNoteDto: CreateNoteDto) {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  findAll() {
    return this.noteModel.find().exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto).exec();
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
