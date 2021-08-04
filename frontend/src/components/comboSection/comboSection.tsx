import { Artwork, MultiArtwork } from '../../models/artwork';
import { Message } from "../../models/message";
import { Video } from "../../models/video";
import DisplayedLanguage from "../../models/language";
import ArtworkCard from '../gallery/artworkCard/artworkCard';
import MessageCard from "../messageSection/messageCard/messageCard";
import MultiArtworkCard from '../gallery/artworkCard/multiArtworkCard';
import VideoCard from '../videoSection/videoCard';
import BaseSection from "../../shared/components/baseSection/baseSection";
import { CardStyles } from "../../shared/components/baseCard/baseCard";

import './comboSection.css';

export default class ComboSection extends BaseSection<Message | Artwork | Video | Game | MultiArtwork> {
    renderCard(object: (Message | Artwork | Video | Game | MultiArtwork), cardStyleIndex: number, language: DisplayedLanguage, id: number): JSX.Element {
        // TODO: messagecard-center might not used or needed
        if ("messageID" in object) {
            return (
                <div key={id} className="card-section">
                    <MessageCard key={object.messageID} object={object} cardStyleIndex={id % CardStyles.length} language={language} />
                </div>
            );
        } else if ("artworkID" in object) {
            return (
                <div key={id} className="card-section">
                    <ArtworkCard key={object.artworkID} object={object} cardStyleIndex={id % CardStyles.length} />
                </div>
            );
        } else if ("videoID" in object) {
            return (
                <div key={id} className="card-section">
                    <VideoCard key={object.videoID} object={object} cardStyleIndex={id % CardStyles.length} />
                </div>
            );
        } else if ("gallery" in object && "metadata" in object) {
            return (
                <div key={id} className="card-section">
                    <MultiArtworkCard key={object.metadata.metadataID} object={object} cardStyleIndex={id % CardStyles.length} />
                </div>
            );
        }
        return (<div />);
    }
}
