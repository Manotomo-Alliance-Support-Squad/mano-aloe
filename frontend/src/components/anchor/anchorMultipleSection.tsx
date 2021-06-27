import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/anchor";
import AnchorButton from "./anchorButton";
import "./anchorMultipleSection.css";

export interface MultipleAnchorStates {
    href: string,
    lastUpdate: Date,
}

interface AnchorMultipleSectionProps extends AnchorSectionProps {
    anchors: Anchor[];
    activeHrefs: MultipleAnchorStates[];
}

export default class AnchorMultipleSection extends React.Component<AnchorMultipleSectionProps> {
    constructor(props: AnchorMultipleSectionProps) {
        super(props);
        this.renderAnchor = this.renderAnchor.bind(this);
    }

    renderAnchor(anchor: Anchor, index: number) {
        const { anchors } = this.props;
        let { activeHrefs = [] } = this.props;
        activeHrefs = activeHrefs.sort((a, b) => a.lastUpdate > b.lastUpdate ? -1 : 1);

        const activeClass = activeHrefs.length > 0 && activeHrefs[0].href === anchor.href ? "active" : "";
        const lastClass = index == anchors.length - 1 ? " last" : "";

        return (
            <div key={anchor.href} className={activeClass + lastClass}>
                <div className="anchor-seperator" />
                <AnchorButton anchor={anchor} />
            </div>
        );
    }

    render() {
        const { anchors, position } = this.props;
        return (
            <div className={"anchor-section multiple " + position} style={{ "--element-count": anchors.length } as React.CSSProperties}>
                {anchors.map(this.renderAnchor)}
            </div>
        );
    }
}
