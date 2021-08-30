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

    render() {
        return (
            <div className="error-not-found-container">
                <div className="error-not-found-title">
                    404 not found!
                </div>
                <div className="error-not-found-content">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/h6IwhTuKSRk?start=13" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="error-not-found-content">
                    We combed the desert far and wide, but we ain't found shit!
                </div>
                Flexbox is really versatile. 
                First, you can try reversing divs in JS and suddenly break everything because you suck, 
                or have divs using text-align: center flash those perfectly centered texts, or have css 
                polluting the homepage's CSS and putting them on like, "Haha, fsck'd your props!" 
                That's just way too cute! Instead, flexboxes within flexboxes! I really like when flexbox have 
                like 3 layers of display: flex, and it's amazing how it still fscking works. 
                I really like how it can fulfill all those abstract needs. 
                Being able to switch up the direction and orientation of flexbox based on your mood 
                is a lot of fun too!
                It's actually so much fun! You have a center-justified flexbox, or a flex-direction: reverse, 
                everything! It's like you're enjoying all these kinds of flexbox at a buffet. 
                I really want Zapple to try some on or Ringo to try some on to complement their text-align: center. 
                We really need flexbox to become a thing everywhere and start using them for everything. 
                Don't. You. Think. We. Really. Need. To. Officially. Give. Everyone. Flexbox?
            </div>
        )
    }
}
