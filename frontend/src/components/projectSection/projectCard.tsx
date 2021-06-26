import { Component } from 'react';
import { InView } from 'react-intersection-observer';
import "./projectCard.css";

interface ProjectCardProps {
    username: string,
    title: string,
    description: string,
    thumbnail: string,
    projectlink: string,
}


export default class ProjectCard extends Component<ProjectCardProps>{

    constructor(props: ProjectCardProps) {
        super(props);
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
                        <a href={this.props.projectlink} target="_blank">
                            <img src={this.props.thumbnail} className="project-card-thumbnail" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
