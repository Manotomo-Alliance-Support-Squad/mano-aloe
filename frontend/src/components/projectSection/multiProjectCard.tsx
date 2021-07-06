import { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArtworkImage from '../gallery/artworkCard/artworkImage';
import { ExternalLink, stringToLink } from '../../models/url';
import "./projectCard.css";

interface MultiProjectCardProps {
    username: string,
    title: string,
    description: string,
    images: string[],
    projectlink: string,
}

export default class MultiProjectCard extends Component<MultiProjectCardProps>{
    renderContent() {
        return (
            <Carousel autoPlay 
                    showThumbs={false} 
                    swipeable={true} 
                    infiniteLoop={true} 
                    dynamicHeight={true}>
                {this.props.images.map((obj, idx) => {
                    return (
                        <ArtworkImage key={idx} 
                                artworkLink={obj} 
                                title={idx.toString()} 
                                blurhash="LGF5]+Yk^6#M@-5c,1J5@[or[Q6." />
                    );
                })}
            </Carousel>
        )
    }

    render() {
        return (
            <div className="project-card-container">
                <div className="project-card">
                    <div className="project-card-description-container right">
                        <h2>
                            <a href={this.props.projectlink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                {this.props.title}
                            </a>
                        </h2>
                        <p className="project-card-description">
                            {this.props.description}
                        </p>
                        <div className="project-card-description-sign">
                            {this.props.username? "- " + this.props.username : ""}
                        </div>
                    </div>
                    <div className="project-card-thumbnail-container left">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}
