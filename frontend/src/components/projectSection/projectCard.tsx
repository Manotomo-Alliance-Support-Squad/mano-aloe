import { Component } from 'react';
import "./projectCard.css";

interface ProjectCardProps {
    username: string,
    title: string,
    description: string,
    thumbnail: string,
    projectlink: string,
}

export default class ProjectCard extends Component<ProjectCardProps>{
    isEmbedYoutubeLink(link: string): boolean {
        return link.includes('youtube') && link.includes('embed');
    }

    renderContent() {
        if (this.isEmbedYoutubeLink(this.props.projectlink)) {
            return (
                <iframe src={this.props.projectlink}
                        allowFullScreen className="project-card-content project-card-video"
                        title={this.props.title} />
            )
        } else {
            return (
                <a href={this.props.projectlink} target="_blank" rel="noopener noreferrer">
                    <img src={this.props.thumbnail} className="project-card-content project-card-thumbnail" alt="thumbnail"/>
                </a>
            )
        }

    }

    render() {
        return (
            <div className="project-card-container">
                <div className="project-card">
                    <div className="project-card-description-container right">
                        <h2>
                            {this.props.title}
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
