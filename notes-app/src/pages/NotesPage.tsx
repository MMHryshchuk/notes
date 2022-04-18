import { Container, List, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import noteService from "../api/api";
import { NoteType } from "../api/models/note";
import { NOTES_CONTAINER_MIN_WIDTH } from "../config";
import NoteForm from "../sections/NoteForm";
import NoteItem from "../sections/NoteItem";

const ContainerWrapperStyle = styled(Container)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

const ContentWrapperStyle = styled("div")({
    minWidth: NOTES_CONTAINER_MIN_WIDTH,
});

export default function NotesPage() {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const [noteList, setNoteList] = useState<NoteType[]>([]);
    const handleCreateNote = async (note: NoteType) => {
        setNoteList((prevNoteList) => [note, ...prevNoteList]);
    };

    const showErrorMessage = () =>
        enqueueSnackbar(t("common.somethingWentWrong"), {
            variant: "error",
        });

    const handleDeleteNote = async (noteId: string) => {
        try {
            await noteService.deleteNote(noteId);
            // Optimistic update
            setNoteList((prevList) =>
                prevList.filter((note) => note.noteId !== noteId)
            );
            enqueueSnackbar(t("note.notesWasDeleted"), {
                variant: "success",
            });
        } catch {
            showErrorMessage();
        }
    };

    const handleUpdateNote = async (noteId: string) => {
        try {
            const responseNote = await noteService.updateNoteStatus(noteId);
            enqueueSnackbar(t("note.notesWasUpdated"), {
                variant: "success",
            });
            setNoteList((prevList) =>
                prevList.map((note) =>
                    note.noteId === noteId ? responseNote : note
                )
            );
        } catch {
            showErrorMessage();
        }
    };

    const loadNoteList = async () => {
        try {
            const response = await noteService.loadNoteList();
            setNoteList(response);
        } catch {}
    };

    useEffect(() => {
        loadNoteList();
    }, []);

    return (
        <ContainerWrapperStyle>
            <ContentWrapperStyle>
                <NoteForm onCreate={handleCreateNote} />
                <List>
                    {noteList.map((note) => (
                        <NoteItem
                            key={note.noteId}
                            note={note}
                            onUpdate={handleUpdateNote}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </List>
            </ContentWrapperStyle>
        </ContainerWrapperStyle>
    );
}
