import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import i18next from "i18next";
import * as React from "react";
import { CustomLink } from "../components/CustomLink";
import LanguagePopover from "../components/LanguagePopover";
import { APP_PATH } from "../routes/paths";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
}));

const LogoStyle = styled("img")({
    width: 40,
    height: 40,
});

const pages = [
    {
        name: i18next.t("note.notes"),
        link: APP_PATH.notes,
    },
    {
        name: i18next.t("about.about"),
        link: APP_PATH.about,
    },
];

const AppHeader = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBarStyle position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoStyle src="/logo.png" alt={"logo"} />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Button
                                        key={index}
                                        component={CustomLink}
                                        to={page.link}
                                        sx={{ my: 2, display: "block" }}
                                    >
                                        {page.name}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                component={CustomLink}
                                to={page.link}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    display: "block",
                                    textTransform: "capitalize",
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <LanguagePopover />
                    </Box>
                </Toolbar>
            </Container>
        </AppBarStyle>
    );
};
export default AppHeader;
