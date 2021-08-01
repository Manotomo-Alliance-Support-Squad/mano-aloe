import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import { Message } from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import { Announcement } from "../../models/announcement"
import { Artwork, MultiArtwork } from "../../models/artwork"
import { Video } from "../../models/video"
import AnchorSupportedSection, { handleSectionVisibility } from "../../components/anchorSupportedSection/anchorSupportedSection";
import AnchorStandaloneBotan from "../../components/anchor/anchorStandaloneBotan";
import AnnouncementSection from "../../components/announcementSection/announcementSection"

import ProjectCard from '../../components/projectSection/projectCard';
import MultiProjectCard from '../../components/projectSection/multiProjectCard';
import ImageCard from '../../components/projectSection/imageCard';
import FadeIn from '../../components/fadeInSection/fadeInSection';

// CSS
import './home.css';
import '../../shared/globalStyles/global.css'

// Hack for community card before messages
import '../../components/headerSection/header.css';
import { Anchor, AnchorSectionPosition } from '../../models/anchor';
import AnchorMultipleSection, { MultipleAnchorStates } from '../../components/anchor/anchorMultipleSection';
import { Game } from '../../models/game';
import CreditsModal from "../../components/modals/credits/creditsModal/creditsModal";

// Icon for section
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MovieIcon from '@material-ui/icons/Movie';
import EmailIcon from '@material-ui/icons/Email';
import ErrorIcon from '@material-ui/icons/Error';

export interface HomePageProps {

}

export interface HomePageState {
    artloading: boolean;
    messageLoaded: boolean;
    announcementLoaded: boolean;
    messages: Message[];
    announcements: Announcement[];
    artworks: Artwork[];
    multiArtworks: MultiArtwork[];
    videos: Video[];
    games: Game[];
    activeHrefs: MultipleAnchorStates[];
}

// Note: anchor text should be one word
const Anchors: Anchor[] = [
    {
        href: "#movie-anchor",
        svgIcon: MovieIcon,
        text: "Movie",
    },
    {
        href: "#messages-anchor",
        svgIcon: EmailIcon,
        text: "Messages",
    },
    {
        href: "#credits-anchor",
        svgIcon: ErrorIcon,
        text: "Credits",
    },
]

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
        private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.loadVideo = this.loadVideo.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.loadAnnouncements = this.loadAnnouncements.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.loadMultiGallery = this.loadMultiGallery.bind(this);
        this.loadGames = this.loadGames.bind(this);

        this.onAnchorVisible = this.onAnchorVisible.bind(this);
    }

    state: HomePageState = {
        artloading: true,
        messageLoaded: false,
        announcementLoaded: false,
        messages: [],
        announcements: [],
        artworks: [],
        videos: [],
        games: [],
        multiArtworks: [],
        activeHrefs: [],
    }

    componentDidMount() {
        this.getData();
    }

    private getData(): void {
        this.loadMessages()
        this.loadAnnouncements();
        this.loadArtwork();
        this.loadVideo();
        this.loadMultiGallery();
        this.loadGames();
    }

    onAnchorVisible(isVisible: boolean, activeHref: string) {
        handleSectionVisibility(this, isVisible, activeHref);
    }

    async loadMessages() {
        const setMessagesToState = (messages: Message[]) => this.setState({ messages, messageLoaded: true });
        const getMessagesFromService = () => this.manoAloeService.getAllMessages()
            .then(setMessagesToState)
            .catch(console.error);

        const messages = SessionService.getMessages() ?? [];
        if (messages?.length) {
            setMessagesToState(messages);
        } else {
            getMessagesFromService().finally(
                () => SessionService.saveMessages(this.state.messages)
            );
        }
    }

    async loadAnnouncements() {
        const setAnnouncementsToState = (announcements: Announcement[]) => this.setState({ announcements, announcementLoaded: true });
        this.manoAloeService.getAllAnnouncements()
            .then(setAnnouncementsToState)
            .catch(console.error);
    }

    async loadVideo() {
        const setVideosToState = (videos: Video[]) => this.setState({ videos });
        const getVideoFromService = () => this.manoAloeService.getVideo()
            .then(setVideosToState)
            .catch(console.error);

        const videos = SessionService.getVideo() ?? [];
        if (videos?.length) {
            setVideosToState(videos);
        } else {
            getVideoFromService().finally(
                () => SessionService.saveVideo(this.state.videos)
            );
        }
    }


    async loadArtwork() {
        const setArtworksToState = (artworks: Artwork[]) => this.setState({ artloading: false, artworks });
        const getArtworkFromService = () => this.manoAloeService.getGallery()
            .then(setArtworksToState)
            .catch(console.error);

        const artworks = SessionService.getGallery() ?? [];
        if (artworks?.length) {
            setArtworksToState(artworks);
        } else {
            getArtworkFromService().finally(
                () => SessionService.saveGallery(this.state.artworks)
            );
        }
    }

    async loadMultiGallery() {
        const setMultipleArtworksToState = (multiArtworks: MultiArtwork[]) => this.setState({ multiArtworks });
        const getMultipleArtworkFromService = () => this.manoAloeService.getMultiGallery()
            .then(setMultipleArtworksToState)
            .catch(console.error);

        const multiArtworks = SessionService.getMultiGallery() ?? [];
        if (multiArtworks?.length) {
            setMultipleArtworksToState(multiArtworks);
        } else {
            getMultipleArtworkFromService().finally(
                () => SessionService.saveMultiGallery(this.state.multiArtworks)
            );
        }
    }

    async loadGames() {
        const setGamesToState = (games: Game[]) => this.setState({ games });
        const getGamseFromService = () => this.manoAloeService.getGame()
            .then(setGamesToState)
            .catch(console.error);

        const games = SessionService.getGame() ?? [];
        if (games?.length) {
            setGamesToState(games);
        } else {
            getGamseFromService().finally(
                () => SessionService.saveGame(this.state.games)
            );
        }
    }

    renderCardSection(data: (Message | Artwork | Video | MultiArtwork)[]) {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <ComboSection data={data} /> : <div />}
                </div>
            </div>
        )
    }

    randomizeArrayWithSeed(unshuffled_arr: any[], seed: string) {
        let rng = seedrandom(seed);
        // Schwartzian transform
        return unshuffled_arr
            .map((a) => ({ sort: rng(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }

    // We do this because state setting is async and trying to create this in getData yields empty arrays
    compileCardData() {
        let comboCardData: (Message | Artwork | Video | MultiArtwork)[] = [];
        let mainContentArray: any[] = [];
        let subContentArray: any[] = [];
        let multimediaCount: number = this.state.artworks.length + this.state.videos.length + this.state.multiArtworks.length;
        let indexIncrementSpacing: number;

        // The higher count of the two types of content gets to determine the sprinkling of the type of content
        if (multimediaCount > this.state.messages.length) {
            mainContentArray = this.randomizeArrayWithSeed(
                mainContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",  // seed to get the same randomization results every time
            );
            subContentArray = this.state.messages;

            indexIncrementSpacing = Math.floor(multimediaCount / this.state.messages.length);
        } else {
            mainContentArray = this.state.messages;
            subContentArray = this.randomizeArrayWithSeed(
                subContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",  // seed to get the same randomization results every time
            );
            if (multimediaCount === 0) {
                indexIncrementSpacing = -1;

            } else {
                indexIncrementSpacing = Math.floor(this.state.messages.length / multimediaCount);
            }
        }

        // Main content is the type of content we have more of
        for (
            let mainContentIndex = 0, subContentIndex = 0;
            mainContentIndex < mainContentArray.length;
            mainContentIndex++) {
            comboCardData.push(mainContentArray[mainContentIndex]);

            if (indexIncrementSpacing === -1) {
                continue;
            }
            else if (mainContentIndex % indexIncrementSpacing === 0 && subContentIndex < subContentArray.length) {
                comboCardData.push(subContentArray[subContentIndex]);
                subContentIndex++;
            }
        }

        return comboCardData
    }

    render() {
        const comboCardData = this.compileCardData()
        const { activeHrefs } = this.state;
        return (
            <div className="home-root">
                <div className="home-container">                     
                    <div className="separator" />
                    <AnchorSupportedSection anchor={Anchors[0]} onVisible={this.onAnchorVisible}>
                        <div className="main-video-container">
                        <iframe title="Mano Aloe Fanmade Video" className="video-tag height-width-100"
                                src="https://www.youtube-nocookie.com/embed/1QdGzRGSuOM?rel=0" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                        </div>
                    </AnchorSupportedSection>
                    <div className="separator" />
                    <div id="announcements" className="justify-center padding-top">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container"/>
                        </div>
                    </div>
                    <AnchorSupportedSection anchor={Anchors[1]} onVisible={this.onAnchorVisible}>
                        <FadeIn className="fade-in">
                            <div className="home-message-header">
                                <h3>
                                    Messages
                                </h3>
                            </div>
                        </FadeIn>
                        {this.renderCardSection(comboCardData)}
                    </AnchorSupportedSection>
                    <div style={{ height: "5rem" }} />
                    <AnchorSupportedSection anchor={Anchors[2]} onVisible={this.onAnchorVisible}>
                        <FadeIn className="fade-in">
                            <CreditsModal />
                        </FadeIn>
                    </AnchorSupportedSection>
                    <div style={{ height: "200px" }} />
                </div>
                <AnchorMultipleSection position={AnchorSectionPosition.RIGHT} activeHrefs={activeHrefs} anchors={Anchors} />
            </div>
        )
    }
}
