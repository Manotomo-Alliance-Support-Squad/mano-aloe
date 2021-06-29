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

import ProjectCard from '../../components/projectSection/projectCard';
import ImageCard from '../../components/projectSection/imageCard';
import FadeIn from '../../components/fadeInSection/fadeInSection';

//Thumbnails
import Project1Thumb from '../../assets/thumbnails/Goodbye_Coco_thumbnail-Revel.jpg';
import Project2Thumb from '../../assets/thumbnails/Cocos_Scrapbook_Cover-Capt-Jules.jpg';
import Project4Thumb from '../../assets/thumbnails/gamethumbnail.png';
import Project5Thumb from '../../assets/thumbnails/animationthumbnail.png';
import Project6Thumb from '../../assets/thumbnails/randomcoco.png';
import Project7Thumb from '../../assets/thumbnails/pheelgag.png';
import Project8Thumb from '../../assets/thumbnails/2d2c.jpg';
import Project9Thumb from '../../assets/thumbnails/strongestluknights.jpg';
import Project10Thumb from '../../assets/thumbnails/kaichouproject.png';

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

const Anchors: Anchor[] = [
    {
        href: "#projects-anchor",
        svgIcon: MovieIcon,
        text: "Projects",
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
                    <div className="home-hidden-text">Fix home-header from clipping when reloading the page while at topmost or first time load the site</div>
                    <div className="home-header fade-in">
                        <h1 className="home-header-title">Dear Coco</h1>
                        <div className="home-header-text">
                            You are one of the most remarkable people we have ever known. Your amazing contributions to the community have brought countless overseas viewers down the rabbit hole and, although we are saddened by your decision to graduate, we will always remember and support you. May you fly to ever greater heights.
                            <br /><br />For your work, we would like to present you this honorary degree for the Master of Kusa.
                        </div>
                        <div style={{ height: "5rem" }} />
                        <AnchorStandaloneBotan anchor={Anchors[0]} svgIcon={ExpandMoreIcon} position={AnchorSectionPosition.LEFT} />
                    </div>
                    <AnchorSupportedSection anchor={Anchors[0]} onVisible={this.onAnchorVisible}>
                        <div style={{ height: "5rem" }} />
                        <ImageCard
                            imageId="cocodiploma"
                            modalCaption=""
                            thumbnail="https://cdn.discordapp.com/attachments/745465408848527360/858470646824566814/diploma_final.png" />
                        <div className="project-card-section">
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="Revel"
                                    title="Goodbye Coco"
                                    projectlink="https://www.youtube.com/embed/900P2WPzl-M"
                                    description={"The time may have been short, but the memes will last a lifetime. So don't cry my friends, and let us send Coco off with laughs in the air and smiles on our faces, as we wish her a good life ahead of her. Please listen to this short song I wrote for Coco and know that this is not the end of a story, but the start of a legend that we can tell our friends without an end."}
                                    thumbnail={Project1Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="Capt-Jules"
                                    title="A Scrapbook for Coco"
                                    projectlink="https://issuu.com/capt-jules/docs/scrapbook_for_coco_15fa8943b06163"
                                    description={"Hello everyone! Here's a little something for you all! Presenting a small digital scrapbook featuring some of Coco's memorable moments! So, let's take a bit and look back at those happy memories, hope you all enjoy! 💕\n\nOf course, thank you Kaichou for everything you have done in this VTubing world and to this wonderful community for never failing to show your love! It has been a fun ride that I'm sure will keep on going! It may be a sad time for some of us, but things will get better. With that said, thank you and take care, everyone!"}
                                    thumbnail={Project2Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="Kelanduo"
                                    title="PATH"
                                    projectlink="https://www.youtube.com/embed/c-4qmfRqEIQ"
                                    description={"[While Kelanduo wasn't able to provide us with a description, his hard work and dedication tell us much more than words ever could.]"}
                                    thumbnail="http://i3.ytimg.com/vi/c-4qmfRqEIQ/maxresdefault.jpg" />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="PheelGagg"
                                    title="[WIP] Coco's Mini-Letters Collection"
                                    projectlink=""
                                    description={"A small group of Kaigainikis from different parts of the world writing individual letters with a twist of puzzle art at the back their pages for Kaichou to piece together!\n\n\
-art by Clueless weab"}
                                    thumbnail={Project7Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="With love, from fans all across the world."
                                    title="[GAME COMING SOON] Dragon Legend"
                                    projectlink=""
                                    description={"A seam in the sky birthed They of the dark,\n\
Then, with fire roared the dragon of new starts,\n\
Thus fled They with no bite and only bark,\n\
From she who saves and mends our broken hearts.\n\
\n\
Much thanks to Kaichou and this amazing community that she’s helped bring together. What a blessing this wonderful journey has been. Let’s all keep smiling and have many more together! To Kaichou, you may be out of our sights for a little bit, but you’ll never leave our hearts! KIRYU-KAI FOREVER!"}
                                    thumbnail={Project4Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="BadGrammar"
                                    title="[ANIMATION COMING SOON]"
                                    projectlink=""
                                    description={"Hi, from humble cine bundle team, we present you with short video about Coco, combining some of the legacy that she is leaving behind\n\nCoco model - Zany\nAssets modelling and animation - Zingy, 1001powerups, BadGrammar"}
                                    thumbnail={Project5Thumb} />
                            </FadeIn>
                            <div className="project-separator" style={{ height: "15vh" /*guh, hard-coded css*/ }} />
                            <FadeIn className="fade-in">
                                <div className="project-separator-header">
                                    <h1>More Amazing Fan-Made Websites</h1>
                                </div>
                            </FadeIn>
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username=""
                                    title="[WIP] 2D2C Kiryu Coco Graduation Project"
                                    projectlink="https://kcgp.tw/en"
                                    description={"[Their site is still in the works, stay tuned for updates!]\n\nCheck out the 2d2c fan website! The 2d2c guys put a lot of hard work into their projects, so please do pay them a visit!"}
                                    thumbnail={Project8Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="Tom 'Skeletom' Farro"
                                    title="Random Coco"
                                    projectlink="https://www.random-co.co/"
                                    description={"Thank you, sincerely, for everything you’ve done. For Vtubing, for your peers, and for us. You’ve permanently improved the Vtuber ecosystem, constantly pushing the line forward. You’re going to shake heaven and earth with your next step.\n\n\
You brought levity to me in the miserable 2020. Your fearless self-expression inspired me to try Vtubing myself in 2021! And your karaoke training arc has even pushed me to try to improve my own singing (though I have always loved your voice).\n\n\
Arigathanks, mf."}
                                    thumbnail={Project6Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username="tam"
                                    title="The Strongest Luknight"
                                    projectlink="https://thestrongestluknight.com/"
                                    description={"The Luknights' graduation present to Coco. You were the greatest Luknight and will forever be remembered!"}
                                    thumbnail={Project9Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                            <FadeIn className="fade-in">
                                <ProjectCard
                                    username=""
                                    title="The Kaichou Project"
                                    projectlink="http://kaichouproject.net"
                                    description={"The guys over at the Kaichou Project Discord have been working on another website! Go Check them out! Their message submissions are still open as well!"}
                                    thumbnail={Project10Thumb} />
                            </FadeIn>
                            <div className="project-separator" />
                        </div>
                    </AnchorSupportedSection>
                    <div style={{ height: "100px" }} />
                    <FadeIn className="fade-in">
                        <div className="home-message-header">
                            <h3>
                                Messages
                            </h3>
                        </div>
                    </FadeIn>
                    <AnchorSupportedSection anchor={Anchors[1]} onVisible={this.onAnchorVisible}>
                        <FadeIn className="fade-in">
                            {this.renderCardSection(comboCardData)}
                        </FadeIn>
                    </AnchorSupportedSection>
                    <div style={{ height: "5rem" }} />
                    <AnchorSupportedSection anchor={Anchors[2]} onVisible={this.onAnchorVisible}>
                        <FadeIn className="fade-in">
                            <CreditsModal />
                        </FadeIn>
                    </AnchorSupportedSection>
                    <div style={{ height: "600px" }} />
                </div>
                <AnchorMultipleSection position={AnchorSectionPosition.RIGHT} activeHrefs={activeHrefs} anchors={Anchors} />
            </div>
        )
    }
}
