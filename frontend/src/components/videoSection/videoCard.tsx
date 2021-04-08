import React from 'react';
import BaseCard, {BaseCardProps, BaseCardState} from "../../shared/components/baseCard/baseCard";
import classNames from 'classnames';
import handleViewport from 'react-in-viewport';
import { Video } from '../../models/video';
import './videoCard.css';
import { linkToString } from '../../models/url';

enum ImageLoadingState {
    NotLoaded,
    Loading,
    Loaded,
}

interface VideoCardProps extends BaseCardProps<Video> {
}

interface VideoCardState extends BaseCardState {
    loadingState: ImageLoadingState,
}

export default class VideoCard extends BaseCard<Video, VideoCardProps, VideoCardState> {
    private readonly video: Video;
    private readonly username: string;
    private imageElement: HTMLImageElement;

    constructor(props: VideoCardProps) {
        super(props);
        this.video = props.object;
        this.username = this.video.username ? props.object.username : "Anonymous";
        this.imageElement = document.createElement("img");

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    state: VideoCardState = {
        loadingState: ImageLoadingState.NotLoaded,
        inViewport: false // From BaseCardState
    }

    private imageLoaded() {
        this.setState({
            loadingState: ImageLoadingState.Loaded,
        });

        this.imageElement.removeEventListener("load", this.imageLoaded);
    }

    private setImage() {
        if (this.state.loadingState === ImageLoadingState.NotLoaded) {
            this.imageElement.src = linkToString(this.video.videoLink);
            this.imageElement.addEventListener("load", this.imageLoaded);

            this.setState({
                loadingState: ImageLoadingState.Loading,
            });
        }
    }

    componentDidMount() {
        this.setImage();
    }

    componentDidUpdate() {
        this.setImage();
    }

    renderVideo() {
        const hasLoaded = this.state.loadingState === ImageLoadingState.Loaded;
        const videoLink = linkToString(this.video.videoLink);
        const artistLink = this.video.artistLink ? linkToString(this.video.artistLink) : "#no_artist_link";

        return (
            <div className="video-card">
                <img className="video-card-img" src={videoLink} alt={this.video.title} />
                <div className="video-card-footer">
                    <div className="title">{this.video.title}</div>
                    <p>
                        <div className="artist">
                            Artist: <a href={artistLink}>{this.username}</a>
                        </div>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderVideo());
    }
}
