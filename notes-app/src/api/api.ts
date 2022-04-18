import axiosInstance from "./axiosConfig";
import { CreateNoteRequestType, NoteType } from "./models/note";

const noteService = {
    loadNoteList: async (): Promise<NoteType[]> => {
        return await (
            await axiosInstance.get("/notes")
        ).data;
    },
    createNote: async (note: CreateNoteRequestType): Promise<NoteType> => {
        return await (
            await axiosInstance.post("/notes", note)
        ).data;
    },
    updateNoteStatus: async (noteId: string): Promise<NoteType> => {
        return await (
            await axiosInstance.put(`/notes/${noteId}`)
        ).data;
    },
    deleteNote: async (noteId: string): Promise<void> => {
        await axiosInstance.delete(`/notes/${noteId}`);
    },
};

export default noteService;
