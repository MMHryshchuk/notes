import { useTheme } from "@mui/material";
import { LinkProps, useResolvedPath, useMatch, Link } from "react-router-dom";

export function CustomLink({ children, to, ...props }: LinkProps) {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    const theme = useTheme();

    return (
        <Link
            style={{
                color: match
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
            }}
            to={to}
            {...props}
        >
            {children}
        </Link>
    );
}
