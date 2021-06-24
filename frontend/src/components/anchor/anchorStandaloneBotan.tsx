import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/achor";
import AnchorButton from "./anchorButton";
import "./anchorSection.css";

interface AnchorStandaloneBotanProps extends AnchorSectionProps {
    anchor: Anchor;
}

export default class AnchorStandaloneBotan extends React.Component<AnchorStandaloneBotanProps> {
    render() {
        const { anchor } = this.props;
        return (
            <div className="anchorbotan">
                <AnchorButton anchor={anchor} />
            </div>
        );
    }
}
