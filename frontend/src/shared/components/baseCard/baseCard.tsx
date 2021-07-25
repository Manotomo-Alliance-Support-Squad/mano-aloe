import { Component } from "react";
import CSS from "csstype";
import './baseCard.css';
import CardStyle1 from "../../../assets/cards/card1.svg";
import CardStyle2 from "../../../assets/cards/card2.svg";
import CardStyle3 from "../../../assets/cards/card3.svg";

export const CardStyles = [
    [CardStyle1, "#724683"],
    [CardStyle2, "#fd418d"],
    [CardStyle3, "#6e4080"],
]

export interface BaseCardProps<T> {
    object: T;
    cardStyleIndex: number;
}

export interface BaseCardState {
    loaded: boolean;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends Component<P, S> {
    private readonly cardStyleIndex: number;

    constructor(props: P) {
        super(props);
        this.cardStyleIndex = this.props.cardStyleIndex >= CardStyles.length ? Math.floor(Math.random() * CardStyles.length) : this.props.cardStyleIndex;
    }

    state = {
        loaded: false
    } as S

    protected toggleVisibility(inViewport: boolean): void {
        if (inViewport) {
            this.setState({ loaded: true });
        }
    }

    public renderCard(content: JSX.Element): JSX.Element {
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyles[this.cardStyleIndex][0]})`,
        };
        const contentStyles: CSS.Properties = {
            // Use `var(--main-background-color)` here if you want to use the same color for all cards
            backgroundColor: `${CardStyles[this.cardStyleIndex][1]}`,
        };
        return (
            <div className="base-card">
                <div className="card-header" style={rootStyles}/>
                <div className="card-content" style={contentStyles}>
                    {content}
                </div>
            </div>
        );
    }
}
