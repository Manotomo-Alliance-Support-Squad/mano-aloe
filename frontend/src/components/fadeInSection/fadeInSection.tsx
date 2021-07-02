import { Component } from 'react';
import { InView } from 'react-intersection-observer';

import './fadeInSection.css'

interface FadeInProps {
    className: string;
}

interface FadeInState {
    animationClass: string;
}

export default class FadeIn extends Component<FadeInProps> {
    state = {
        animationClass: 'hidden',
    } as FadeInState

    triggerAnimation(inView: boolean) {
        if (!inView) return;
        this.setState({ animationClass: this.props.className })
    }

    render() {
        return (
            <InView className={"fade-in-expand " + this.state.animationClass} onChange={(inView, entry) => this.triggerAnimation(inView)} triggerOnce={true}>
                {this.props.children}
            </InView>
        );
    }
}
