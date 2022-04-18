import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import Router from "./routes";
import { theme } from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Router />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
