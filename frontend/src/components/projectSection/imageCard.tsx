import { Component } from 'react';
import { InView } from 'react-intersection-observer';
import "./projectCard.css";
import "./imageCard.css";

interface ImageCardProps {
    thumbnail: string,
    projectlink: string,
}


export default class ImageCard extends Component<ImageCardProps>{

    constructor(props: ImageCardProps) {
        super(props);
    }

    render() {
        return (
            <div className="image-card-container">
                <div className="project-card">
                    <div className="project-card-thumbnail-container">
                        <img id="thumbnail" className="image-card-thumbnail" src={this.props.thumbnail} />
                        <div id="modal" className="modal">
                            <span className="close">&times;</span>
                            <img className="modal-content" id="img01" />
                            <div id="caption"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
