import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import { Message } from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import { Announcement } from "../../models/announcement"
import { Artwork, MultiArtwork } from "../../models/artwork"
import { Video } from "../../models/video"
import AnnouncementSection from "../../components/announcementSection/announcementSection";
import AnchorSupportedSection from "../../components/anchorSupportedSection/anchorSupportedSection";

import ButtonAppBar from '../../components/navigation/navbar';
import HeaderSection from "../../components/headerSection/header";
import FooterSection from "../../components/footerSection/footer";
import AltNav from '../../components/navigation/altnav';
import AnchorSingleSection from "../../components/anchor/anchorSingleSection";

// CSS
import './home.css';
import '../../shared/globalStyles/global.css'

// Hack for community card before messages
import { LanguageContext, LanguageContextValue } from '../../components/languageSwitch/languageContext';
import MessageCard from '../../components/messageSection/messageCard/messageCard';
import '../../components/headerSection/header.css';
import { Anchor, AnchorSectionPosition } from '../../models/achor';
import AnchorMultipleSection from '../../components/anchor/anchorMultipleSection';
import { ReactComponent as AnchorBotan } from "../../assets/icons/anchorIcon.svg";

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
    activeHrefs: string[];
}

const Anchors: Anchor[] = [
    {
        href: "#video-anchor",
        svgIcon: AnchorBotan,
        text: "Video",
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
    }

    onAnchorVisible(isVisible: boolean, activeHref: string) {
        AnchorSupportedSection.onSectionVisible(this, isVisible, activeHref);
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
            // TODO: create a randomly seeded version of the main content array
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

    pad (pixels: int = 25) {
        return (<div style={{ height: pixels }}></div>);
    }

    render() {
        const comboCardData = this.compileCardData()
        const { activeHrefs } = this.state;
        return (
            <div className="home-root">
                <div>
                    <div className="home-header">
                        <h1 className="home-header-title">Dear Coco,</h1>
                        <div className="home-header-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </div>
                    <div style={{ height: "200px" }} />
                </div>
            </div>
        )
    }
}
