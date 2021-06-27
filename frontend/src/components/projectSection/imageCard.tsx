import { Component } from 'react';
import { InView } from 'react-intersection-observer';
import "./projectCard.css";
import "./imageCard.css";

interface ImageCardProps {
    thumbnail: string,
    imageId: string,
    modalCaption: string, 
}


export default class ImageCard extends Component<ImageCardProps>{
    private readonly modalId: string;
    private readonly modalImgSrcId: string;
    private readonly modalCaption: string;

    constructor(props: ImageCardProps) {
        super(props);
        this.modalId = this.props.imageId + "Modal"
        this.modalImgSrcId = this.modalId + "Imgsrc"
        this.modalCaption = this.modalId + "Caption"

    }

    renderImgModal() {
        var modal = document.getElementById(this.modalId);
        if (!modal) {
            return
        } else {
            modal.style.display = "block";
        }
    }


    render() {
        return (
            <div className="image-card-container">
                <div className="project-card">
                    <div className="project-card-thumbnail-container">
                        <img id={this.props.imageId} className="image-card-thumbnail" src={this.props.thumbnail} />
                        <div id={this.modalId} className="modal">
                            <span className="close">&times;</span>
                            <img className="modal-content" id={this.modalImgSrcId} />
                            <div id="caption"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
