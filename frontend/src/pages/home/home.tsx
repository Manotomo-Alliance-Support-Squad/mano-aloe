import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import { Message } from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import EmailIcon from '@material-ui/icons/Email';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Announcement } from "../../models/announcement"
import { Artwork, MultiArtwork } from "../../models/artwork"
import { Video } from "../../models/video"
import AnnouncementSection from "../../components/announcementSection/announcementSection";
import AnchorSupportedSection, { handleSectionVisibility } from "../../components/anchorSupportedSection/anchorSupportedSection";
import GameSection from '../../components/gamesSection/gameSection';

import ButtonAppBar from '../../components/navigation/navbar';
import HeaderSection from "../../components/headerSection/header";
import FooterSection from "../../components/footerSection/footer";
import AltNav from '../../components/navigation/altnav';
import AnchorSingleSection from "../../components/anchor/anchorSingleSection";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AnchorStandaloneBotan from "../../components/anchor/anchorStandaloneBotan";

import ProjectCard from '../../components/projectSection/projectCard';

// CSS
import './home.css';
import '../../shared/globalStyles/global.css'

// Hack for community card before messages
import { LanguageContext, LanguageContextValue } from '../../components/languageSwitch/languageContext';
import MessageCard from '../../components/messageSection/messageCard/messageCard';
import '../../components/headerSection/header.css';
import { Anchor, AnchorSectionPosition } from '../../models/anchor';
import AnchorMultipleSection, { MultipleAnchorStates } from '../../components/anchor/anchorMultipleSection';
import { ReactComponent as AnchorBotan } from "../../assets/icons/anchorIcon.svg";
import { Game } from '../../models/game';

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

const Anchors: Anchor[] = [
    {
        href: "#projects-anchor",
        svgIcon: ExpandMoreIcon,
        text: "Projects",
    },
    {
        href: "#messages-anchor",
        svgIcon: ExpandMoreIcon,
        text: "Messages",
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

    render() {
        const comboCardData = this.compileCardData()
        const { activeHrefs } = this.state;
        return (
            <div className="home-root">
                <div>
                    <div className="home-header">
                        <h1 className="home-header-title">Dear Coco,</h1>
                        <div className="home-header-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        <AnchorStandaloneBotan anchor={Anchors[0]} position={AnchorSectionPosition.LEFT} />
                    </div>
                    <div style={{ height: "5rem" }} />
                    <AnchorSupportedSection anchor={Anchors[0]} onVisible={this.onAnchorVisible}>
                        <div className="project-card-section">
                            <ProjectCard 
                                username="Revel"
                                title="Song title goes here" 
                                projectlink="https://duckduckgo.com"
                                description={"Dame da ne, dame yo, dame na no yo"} 
                                thumbnail="https://cdn.discordapp.com/attachments/856038775826022411/857377808706961448/Goodbye_Coco_thumbnail.png"/>
                            <ProjectCard 
                                username="With love, from fans all across the world."
                                title="Game title goes here" 
                                projectlink="https://duckduckgo.com"
                                description={"A seam in the sky birthed They of the dark,\n\
Then, with fire roared the dragon of new starts,\n\
Thus fled They with no bite and only bark,\n\
From she who saves and mends our broken hearts.\n\
\n\
Much thanks to Kaichou and this amazing community that she’s helped bring together. What a blessing this wonderful journey has been. Let’s all keep smiling and have many more together! To Kaichou, you may be out of our sights for a little bit, but you’ll never leave our hearts! KIRYU-KAI FOREVER!"} 
                                thumbnail="https://cdn.discordapp.com/attachments/752324770196095057/857089193124429845/unknown.png"/>
                        </div>
                    </AnchorSupportedSection>
                    <AnchorSupportedSection anchor={Anchors[1]} onVisible={this.onAnchorVisible}>
                        {this.renderCardSection(comboCardData)}
                    </AnchorSupportedSection>
                    <div style={{ height: "600px" }} />
                </div>
            </div>
        )
    }
}
