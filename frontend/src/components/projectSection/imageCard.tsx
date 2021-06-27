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
                        <a href={this.props.projectlink} target="_blank" rel="noopener noreferrer">
                            <img src={this.props.thumbnail} className="image-card-thumbnail" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
