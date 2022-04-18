// @mui
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
//

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
    height: "100vh",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
}));

const MainStyle = styled("main")(({ theme }) => ({
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 24,
    overflowY: "scroll",
    [theme.breakpoints.up("lg")]: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 24,
        paddingBottom: 24,
        transition: theme.transitions.create("margin-left", {
            duration: theme.transitions.duration.shorter,
        }),
    },
}));

// ----------------------------------------------------------------------

export default function AppLayout() {
    return (
        <RootStyle>
            <AppHeader />

            <MainStyle>
                <Outlet />
            </MainStyle>

            <AppFooter />
        </RootStyle>
    );
}
