import {Component} from "react";
import {BaseButtonProps, BaseButtonState} from "../../../../shared/components/buttons/baseButton/baseButton";
import {NavButton} from "../../../../shared/components/buttons/navButton/navButton";
import InfoIcon from "@material-ui/icons/Info";

export default class CreditsModalButton extends Component<BaseButtonProps, BaseButtonState> {
    readonly creditsButtonContent = "Credits";

    render() {
        return <NavButton className="global-font global-bold" onClick={this.props.onClick} variant="contained" startIcon={<InfoIcon />} size="large" color="primary">
            {this.creditsButtonContent}
        </NavButton>;
    }
}
