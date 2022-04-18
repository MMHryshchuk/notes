import { boolean, object, string } from "yup";

const payload = {
    body: object({
        isDone: boolean().required("Status is required").default(false),
        text: string()
            .required("Note text is required")
            .max(256, "Note is too long - should be 256 chars maximum."),
    }),
};

const params = {
    params: object({
        noteId: string().required("noteId is required"),
    }),
};

export const createNoteSchema = object({
    ...payload,
});

export const updateNoteSchema = object({
    ...params,
});

export const deleteNoteSchema = object({
    ...params,
});
