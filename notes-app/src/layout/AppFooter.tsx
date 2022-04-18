import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MAIN_FOOTER } from "../config";
import { useTranslation } from "react-i18next";

const FooterStyle = styled("footer")(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],
    minHeight: MAIN_FOOTER,
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));

const FooterTextStyle = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const AppFooter = () => {
    const { t } = useTranslation();
    return (
        <FooterStyle>
            <Container>
                <Typography variant="body1" noWrap component={FooterTextStyle}>
                    {t("common.footer")}
                </Typography>
            </Container>
        </FooterStyle>
    );
};
export default AppFooter;
