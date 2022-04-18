import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface NoteDocument extends mongoose.Document {
    text: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema = new mongoose.Schema(
    {
        noteId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        text: { type: String, default: true },
        isDone: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Note = mongoose.model<NoteDocument>("Note", NoteSchema);

export default Note;
