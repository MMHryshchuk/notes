import { Request, Response } from "express";
import { get } from "lodash";
import {
    createNote,
    deleteNote,
    findAndUpdate,
    findNote,
    getNotes,
} from "../service/note.service";

export async function getNotesHandler(req: Request, res: Response) {
    const noteList = await getNotes();
    return res.send(noteList);
}

export async function createNoteHandler(req: Request, res: Response) {
    const body = req.body;

    const note = await createNote({ ...body });

    return res.send(note);
}

export async function updateNoteHandler(req: Request, res: Response) {
    const noteId = get(req, "params.noteId");
    const note = await findNote({ noteId });

    if (!note) {
        return res.sendStatus(404);
    }

    const updatedNote = await findAndUpdate(
        { noteId },
        { isDone: true },
        { new: true }
    );

    return res.send(updatedNote);
}
export async function getNoteHandler(req: Request, res: Response) {
    const noteId = get(req, "params.noteId");
    const post = await findNote({ noteId });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.send(post);
}

export async function deleteNoteHandler(req: Request, res: Response) {
    const noteId = get(req, "params.noteId");

    const note = await findNote({ noteId });
    if (!note) {
        return res.sendStatus(404);
    }

    await deleteNote({ noteId });

    return res.sendStatus(200);
}
