import { Express, Request, Response } from "express";
import {
    createNoteHandler,
    deleteNoteHandler,
    getNoteHandler,
    getNotesHandler,
    updateNoteHandler,
} from "./controller/note.controller";
import { validateRequest } from "./middleware";
import {
    createNoteSchema,
    deleteNoteSchema,
    updateNoteSchema,
} from "./schema/note.schema";

export default function (app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    // Get all notes
    app.get("/api/notes", getNotesHandler);

    // Create a note
    app.post(
        "/api/notes",
        [validateRequest(createNoteSchema)],
        createNoteHandler
    );

    // Update a note
    app.put(
        "/api/notes/:noteId",
        [validateRequest(updateNoteSchema)],
        updateNoteHandler
    );

    // Get a note
    app.get("/api/notes/:noteId", getNoteHandler);

    // Delete a note
    app.delete(
        "/api/notes/:noteId",
        [validateRequest(deleteNoteSchema)],
        deleteNoteHandler
    );
}
