import { Component, setState } from 'react';
import { InView } from 'react-intersection-observer';

interface FadeInProps {
    className: string;
}

interface FadeInState {
    animationClass: string;
}

export default class FadeIn extends Component<FadeInProps> {

    constructor(props: FadeInProps) {
        super(props);
        this.state.animationClass = "hidden";
    }

    state = {
        animationClass: this.props.animationClass,
    } as FadeInState

    triggerAnimation(inView: boolean) {
        console.log(inView);
        if (!inView) return;
        console.log(this.state.animationClass)
        console.log("setting animation now to "+ this.props.className);
        this.setState({animationClass: this.props.className})
        console.log(this.state.animationClass)
    }

    render() {
        return (
            <InView onChange={(inView, entry) => this.triggerAnimation(inView)} triggerOnce={true}>
                <div className={this.state.animationClass}>
                    {this.props.children}
                </div>
            </InView>
        );
    }
}
