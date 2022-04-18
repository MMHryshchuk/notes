import { Button, Container, Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink as RouterLink } from "react-router-dom";
import { APP_PATH } from "../routes/paths";

const H1Style = styled("h1")(({ theme }) => ({
    color: theme.palette.text.primary,
    textAlign: "center",
}));

export default function AboutPage() {
    const { t } = useTranslation();
    return (
        <Container>
            <Grid container spacing={3} direction="column">
                <Grid item xs={12} lg={3} justifyContent="center">
                    <H1Style>{t("about.title")}</H1Style>
                </Grid>
                <Grid item xs={12} lg={3} justifyContent="center">
                    <Typography
                        variant="body1"
                        sx={{ color: "text.secondary" }}
                        align="center"
                    >
                        {t("about.text")}
                    </Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Button
                        component={RouterLink}
                        to={APP_PATH.notes}
                        size="large"
                        variant="contained"
                    >
                        {t("about.goToNotes")}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
