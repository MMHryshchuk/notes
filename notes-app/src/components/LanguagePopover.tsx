// @mui
import {
    Button,
    ListItemText,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import MenuPopover from "./MenuPopover";
// hooks
// components
import useLocales from "../hooks/useLocales";
import { useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function LanguagePopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const { allLang, currentLang, onChangeLang } = useLocales();

    const theme = useTheme();
    return (
        <>
            <Button
                variant="text"
                size="large"
                ref={anchorRef}
                sx={{
                    my: 2,
                    color: theme.palette.text.primary,
                    display: "block",
                }}
                onClick={() => setOpen(true)}
            >
                <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    textTransform="lowercase"
                >
                    {currentLang.value}
                </Typography>
            </Button>

            <MenuPopover
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef.current}
            >
                <Stack spacing={0.5} sx={{ p: 1 }}>
                    {allLang.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === currentLang.value}
                            onClick={() => {
                                onChangeLang(option.value);
                                setOpen(false);
                            }}
                            sx={{
                                borderRadius: 1,
                                px: 1,
                                textTransform: "capitalize",
                            }}
                        >
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: "body2",
                                    color: theme.palette.text.primary,
                                }}
                            >
                                {option.label}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </Stack>
            </MenuPopover>
        </>
    );
}
