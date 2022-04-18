// @mui
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { NoteType } from "../api/models/note";

// ----------------------------------------------------------------------

type PropsType = {
    note: NoteType;
    onUpdate: (noteId: string) => void;
    onDelete: (noteId: string) => void;
};

export default function NoteItem({ note, onDelete, onUpdate }: PropsType) {
    const [disableUpdate, setDisableUpdate] = useState<boolean>(false);
    const [disableDelete, setDisableDelete] = useState<boolean>(false);

    const handleUpdate = () => {
        setDisableUpdate(true);
        onUpdate(note.noteId);
    };

    const handleDelete = () => {
        setDisableDelete(true);
        onDelete(note.noteId);
    };

    return (
        <ListItem
            secondaryAction={
                note.isDone ? (
                    <IconButton
                        edge="end"
                        disabled={disableDelete}
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        <DeleteIcon color={"primary"} />
                    </IconButton>
                ) : (
                    <IconButton
                        disabled={disableUpdate}
                        edge="end"
                        aria-label="delete"
                        onClick={handleUpdate}
                    >
                        <CheckIcon color={"primary"} />
                    </IconButton>
                )
            }
        >
            <ListItemText
                primary={note.text}
                sx={{
                    textDecoration: note.isDone ? "line-through" : "",
                }}
            />
        </ListItem>
    );
}
