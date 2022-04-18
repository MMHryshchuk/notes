// @mui
import { LoadingButton } from "@mui/lab";
import { Alert, Stack, styled, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import noteService from "../api/api";
import { NoteType } from "../api/models/note";
import useIsMountedRef from "../hooks/useIsMountedRef";
import { isAxiosError } from "../utils/errors";

// ----------------------------------------------------------------------
const ButtonWrapperStyle = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
}));

type InitialValues = {
    note: string;
    afterSubmit?: string;
};

type Props = {
    onCreate: (note: NoteType) => Promise<void>;
};

export default function NoteForm({ onCreate }: Props) {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();

    const NoteFormSchema = Yup.object().shape({
        note: Yup.string().required(t("note.noteIsRequired")),
    });

    const formik = useFormik<InitialValues>({
        initialValues: {
            note: "",
        },
        validationSchema: NoteFormSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                const responseNote = await noteService.createNote({
                    text: values.note,
                });
                enqueueSnackbar(t("note.notesWasCreated"), {
                    variant: "success",
                });

                if (isMountedRef.current) {
                    setSubmitting(false);
                    resetForm();
                    onCreate(responseNote);
                }
            } catch (error) {
                if (isMountedRef) {
                    setSubmitting(false);
                    if (isAxiosError(error))
                        // show error response from api
                        setErrors({ afterSubmit: error.response?.data });
                }
            }
        },
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h5" align="center">
                    {t("note.notes")}
                </Typography>

                {errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit}</Alert>
                )}

                <Stack mt={5} mb={5} spacing={3}>
                    <TextField
                        {...getFieldProps("note")}
                        type="string"
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                        label={t("note.note")}
                        onBlur={(e) => e.preventDefault()}
                        error={Boolean(touched.note && errors.note)}
                        helperText={touched.note && errors.note}
                    />
                </Stack>
                <ButtonWrapperStyle>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        sx={{ minWidth: 120 }}
                    >
                        {t("notes.add")}
                    </LoadingButton>
                </ButtonWrapperStyle>
            </Form>
        </FormikProvider>
    );
}
