import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Note, { NoteDocument } from "../model/note.model";

export function getNotes() {
    return Note.find({}).sort({ createdAt: -1 });
}

export function createNote(input: DocumentDefinition<NoteDocument>) {
    return Note.create(input);
}

export function findNote(
    query: FilterQuery<NoteDocument>,
    options: QueryOptions = { lean: true }
) {
    return Note.findOne(query, {}, options);
}

export function findAndUpdate(
    query: FilterQuery<NoteDocument>,
    update: UpdateQuery<NoteDocument>,
    options: QueryOptions
) {
    return Note.findOneAndUpdate(query, update, options);
}

export function deleteNote(query: FilterQuery<NoteDocument>) {
    return Note.deleteOne(query);
}
