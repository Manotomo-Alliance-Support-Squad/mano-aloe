import React from 'react';
import {Game} from "../../models/game";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service"
import '../../components/gamesSection/gameSection.css'
import GameSection from "../../components/gamesSection/gameSection";
import '../../shared/globalStyles/global.css'
import AnnouncementCard from '../../components/announcementSection/announcementCard';
import {Announcement} from "../../models/announcement";
import DisplayedLanguage from "../../models/language";


export interface GamePageProps {

}

export interface GamePageState {
    loading: boolean;
    games: Game[];
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.getData = this.getData.bind(this);
    }

    state: GamePageState = {
        loading: true,
        games: [],
    }

    componentDidMount() {
        this.getData();
    }

    private getData(): void {
        const cachedGames: Game[] | null = SessionService.getGame();
        if (cachedGames && cachedGames.length) {
            this.setState({loading: false, games: cachedGames});
        } else {
            this.manoAloeService.getGame()
                .then((games: Game[]) => {
                    SessionService.saveGame(games);
                    this.setState({loading: false, games});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
    }

    renderGameSection() {
        if (!this.state.games.length) {
            const emptyAnnouncemment: Announcement = { announcementID: 0, message: "Nothing here! Check back later!" };
            return <AnnouncementCard object={emptyAnnouncemment} cardStyleIndex={0} language={DisplayedLanguage.Original} />;
        }
        else return (
            <GameSection data={this.state.games} customSectionStyle="game-section"/>
        )

    }

    render() {
        return (
            <section id='anchor'>
                <div className="separator"/>
                <div className="wrapper-overlay">
                    {this.renderGameSection()}
                </div>
            </section>
        )
    }
}
