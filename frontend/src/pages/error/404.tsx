import React from 'react';

// CSS
import './404.css';
import '../../shared/globalStyles/global.css'

// Icon for section
import MovieIcon from '@material-ui/icons/Movie';
import EmailIcon from '@material-ui/icons/Email';
import ErrorIcon from '@material-ui/icons/Error';

export interface NotFoundPageProps {

}

export interface NotFoundPageState {
}

export default class NotFoundPage extends React.Component<NotFoundPageProps, NotFoundPageState> {

    constructor(props: NotFoundPageProps) {
        super(props);
    }

    state: NotFoundPageState = {
    }

    componentDidMount() {
    }

    private getData(): void {
    }

    onAnchorVisible(isVisible: boolean, activeHref: string) {
    }

    render() {
        return (
            <div className="error-not-found-container">
                <div className="error-not-found-title">
                    404 not found!
                </div>
                <div className="error-not-found-content">
                    hmmmmmmmmmmmmmmmmmmm
                </div>
            </div>
        )
    }
}
