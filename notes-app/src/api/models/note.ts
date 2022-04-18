export type NoteType = {
    noteId: string;
    text: string;
    isDone: boolean;
};

export type CreateNoteRequestType = {
    text: string;
};
