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
    private readonly modalCaptionId: string;

    constructor(props: ImageCardProps) {
        super(props);
        this.modalId = this.props.imageId + "Modal"
        this.modalImgSrcId = this.modalId + "Imgsrc"
        this.modalCaptionId = this.modalId + "Caption"
        this.renderImgModal = this.renderImgModal.bind(this);
        this.closeImgModal = this.closeImgModal.bind(this);
    }

    renderImgModal(): void {
        var modal = document.getElementById(this.modalId);
        var modalImg = document.getElementById(this.modalImgSrcId) as HTMLImageElement;
        var modalCaption = document.getElementById(this.modalCaptionId);
        if (!modal || !modalImg) {
            return
        } else {
            modal.style.display = "block";
            modalImg.src = this.props.thumbnail;
            if (modalCaption) {
                modalCaption.innerHTML = this.props.modalCaption ? this.props.modalCaption : "";
            }
        }
    }

    closeImgModal(): void {
        var modal = document.getElementById(this.modalId);
        var span = document.getElementsByClassName("close")[0];
        if (!modal || !span) {
            return
        } else {
            modal.style.display = "none";
        }
    }


    render() {
        return (
            <div className="image-card-container">
                <div className="project-card">
                    <div className="project-card-thumbnail-container">
                        <img id={this.props.imageId} className="image-card-thumbnail"
                            src={this.props.thumbnail}
                            onClick={this.renderImgModal}/>
                        <div id={this.modalId} className="modal">
                            <span className="close" onClick={this.closeImgModal}>&times;</span>
                            <img id={this.modalImgSrcId} className="modal-content" src="" />
                            <div id={this.modalCaptionId}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
