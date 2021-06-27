import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/anchor";
import AnchorButton from "./anchorButton";
import "./anchorSection.css";

interface AnchorStandaloneBotanProps extends AnchorSectionProps {
    anchor: Anchor;
    svgIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | OverridableComponent<SvgIconTypeMap<{}, "svg">> | null;
}

export default class AnchorStandaloneBotan extends React.Component<AnchorStandaloneBotanProps> {
    render() {
        const { anchor, svgIcon } = this.props;
        return (
            <div className="anchorbotan standalone">
                <AnchorButton anchor={svgIcon ? { ...anchor, svgIcon } : anchor} />
            </div>
        );
    }
}
