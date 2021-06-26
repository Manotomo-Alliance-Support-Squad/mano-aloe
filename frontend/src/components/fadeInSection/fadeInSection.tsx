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

    constructor(props: FadeInProps) {
        super(props);
    }

    state = {
        animationClass: 'hidden',
    } as FadeInState

    triggerAnimation(inView: boolean) {
        if (!inView) return;
        this.setState({ animationClass: this.props.className })
    }

    render() {
        return (
            <InView className="fade-in-expand" onChange={(inView, entry) => this.triggerAnimation(inView)} triggerOnce={true}>
                <div className={this.state.animationClass}>
                    {this.props.children}
                </div>
            </InView>
        );
    }
}
