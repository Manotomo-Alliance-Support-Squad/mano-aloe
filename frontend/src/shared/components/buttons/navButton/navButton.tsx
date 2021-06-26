import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

export const NavButton = withStyles({
    containedPrimary: {
        color: "var(--theme-special-text)",
        backgroundColor: "var(--theme-special-background)",
        '&:hover': {
            backgroundColor: "var(--theme-special-background-alt)",
        },
    },
})(Button);
