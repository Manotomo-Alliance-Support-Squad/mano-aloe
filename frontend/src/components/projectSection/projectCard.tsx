import { Component } from 'react';
import "./projectCard.css";

interface ProjectCardProps {
    title: string,
    description: string,
    thumbnail: string,
    projectlink: string,
}

export default class ProjectCard extends Component<ProjectCardProps>{

    private readonly description: string;

    constructor(props: ProjectCardProps) {
        super(props);
        this.description = props.description;
    }

    render() {
        return (
            <div className="project-card">
                <div className="project-card-project left">
                    {this.props.thumbnail}
                </div>
                <div className="project-card-description right">
                    {this.props.title}
                    {this.description}
                </div>
            </div>
        );
    }
}
