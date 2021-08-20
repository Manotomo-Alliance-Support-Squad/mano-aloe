import React, {Component} from "react";
import Modal from 'react-modal';
import CreditsModalButton from "./creditsModalButton";
import {IconButton} from "@material-ui/core";

import '../../../../shared/globalStyles/global.css';
import './creditsModal.css'
import {Cancel} from "@material-ui/icons";
import AltNav from "../../../navigation/altnav";

interface CreditsModalState {
    modalIsOpen: boolean,
}

interface CreditsModalProps {
}

export default class CreditsModal extends Component<CreditsModalProps, CreditsModalState> {

    readonly webTeam: string[] = [
        'AreYouW (Frontend, Backend, Devops)',
        'DuongTyler (Frontend, Backend, Devops)',
        'Zapple (Frontend, Backend)',
        'LrJim (Frontend, Backend)',
        'Jesse Zong (Frontend)',
        'Kuroni (Frontend)',
        'Laska (Frontend)',
        'Ringo (Frontend)',
        'Kyuubei (Design)',
        'Rhyolite'
    ];

    readonly artTeam: string[] = [
        'Saeki Makai - Birthday Header',
        'Akatadaiyo - Game character design (manotomo slime)',
        'goo - Site art team manager',
        'Fenneko - Skull Manotome / Minor designs',
        'Nikolai - Fan Art',
        's.Claw - Fan Art',
        'Roy Claise - Meme Fan Art',
        '@IndigoXadeth - Daily Aloe Sketches',
        'Peanuts - Fan Art',
        'Kappce_ - Fan Art',
        'KateLv',
        'Milki0803 - Fan Art',
        'Yu',
        'TakaRex519',
        'deegeetal - Graphic design for web and cinematography teams',
        'MomoTomato',
        'DrawTheOmega - Fan Art',
        'Plus0ne - Fan Art and Animation',
        'Kyuubei - Artwork for the web team',
        'Hiroki - Message card designs and Fan Art',
        'BaronVonSheep',
        'RavenTengu - Fan Art',
        '.grofA - 3D Textures',
        'Kukie-Nyan',
        'ソーランSoran',
        'Killrodx - Fan Art',
        'Warabii',
        'Plus0ne - Fan Art, Fan Animation, Osu! Skin',
        'Zidan3 - Game asset creation in "Ma No Tomo"',
        'Porukana - Art assets for Aloe Bento game',
        'DistantHistory',
        'F.Soulstar - Smug Aloe and Cheerful Debiru artworks',
        'Naelyan',
        'Kanagiri',
        'Duck'
    ];

    readonly audioTeam: string[] = [
        'RavenTengu',
        'Apoptosis - Audio asset feedback',
        'Pizzafari/Hælendleof Loc - Game music and Sound design',
        'Cheese Singles In Your Area - Game BGM'
    ];
                                                                                                                                                                                                                                                      
    readonly gameTeam: string[] = [
        'Yu',
        'TakaRex519',
        'Ice',
        'Loki\_Magikill',
        'Lazier Bear',
        'Cixiny',
        'RavenTengu',
        'ZanyDreamer - Mano Aloe\'s Halloween Adventure',
        'Apoptosis - Level Design and Playtesting',
        'Pizzafari/Hælendleof Loc - Game music, Testing',
        'King of Ferrets - Aloe Snake, Games Project Manager',
        '2ndAdventureGaming - Bento Box Game',
        'Despair - Game tester',
        'Senpai - Game tester',
        'Ashkanz - Programming advice, Document Manager, Idea factory, Bugfixing',
        '#Huntv3334',
        'SparkiL',
        'Huzzah',
        'Cheese Singles In Your Area - Game BGM',
        'Schrodinger - Game testing',
        'Saitô - Aloe\'s Bento Shop Game Dev',
        'Zidan3 - Game asset creation (boss room) in "Ma No Tomo"',
        'CinnamonMatcha - Playtesting and translations'
    ];

    readonly modTeam: string[] = [
        'TakaRex519',
        'Ice',
        'ChivChav',
        'Callme\_Luthfi',
        'Senpai',
        'VintageGhost',
        'Nephilimus',
        'RazorNaitor - Organizer',
        'Arvenn',
        'Splinter - Discussion channel moderation',
        'Necrosis - Channel moderation',
        'The\_Chainwalker - Planning, Community engagement, Server banner, Message relay',
        'Atsuyas - Asset management, processing and scripting'
    ];

    readonly secretaries: string[] = [
        'MomoTomato',
        'Kiwi - Progress Log'
    ];

    readonly translationTeam: string[] = [
        'cokona2 - Tweet translations',
        'Romanée',                            
        'Ashichuu',
        'ChronosK',
        'ソーランSoran - daily translation of messages',
        'kurapan',
        'Atsuyas',
        'Hyourinmaru',
        'CinnamonMatcha'
    ];

    readonly twitterTeam: string[] = [
        'DrawTheOmega ',                                            
        'Kyuubei',                                                  
        'Hiroki',                                                   
        'Nephilimus',                                               
        'Tweeter',                                                  
        'Mr.Mech',                                                  
        'BaronVonSheep',                                            
        'myrial',                                                   
        'Lucas Yeo',                                                
        'Callme\_Luthfi',                                           
        'Arvenn',                                                   
        'Saitô'
    ];

    constructor(props: CreditsModalProps) {
        super(props);
        this.state = {modalIsOpen: false};
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    renderStringList(stringList: string[], listHeader: string) {
        return (
            <div>
                <div className="global-font credits-list-header">
                    {listHeader}
                </div>
                <div className="line"/>
                <ul className="credits-list">
                    {stringList.map((value: string) => <li className="global-font credits-list-element">{value}</li>)}
                </ul>
            </div>
        )
    }

    render() {
        return(
            <div className="justify-center">
                <Modal
                    closeTimeoutMS={500}
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.openModal}
                    onRequestClose={this.closeModal}>
                    <div className="credits-modal-exit-button-container">
                        <IconButton
                            onClick={this.closeModal}>
                            <Cancel style={{ fontSize: 50, color: 'white' }} />
                        </IconButton>
                    </div>
                    <div className="credits-container">
                        <h1 className="global-font">
                            Credits
                        </h1>
                        <div>
                            {this.renderStringList(this.webTeam, 'Website Contributors')}
                            {this.renderStringList(this.artTeam, 'Art and Design Contributors')}
                            {this.renderStringList(this.audioTeam, 'Audio Design Contributors')}
                            {this.renderStringList(this.gameTeam, 'Game Development and Design Contributors')}
                            {this.renderStringList(this.translationTeam, 'Translators')}
                            {this.renderStringList(this.secretaries, 'Secretaries')}
                            {this.renderStringList(this.modTeam, 'Moderators and Organizers')}
                            {this.renderStringList(this.twitterTeam, 'Twitter Team')}
                        </div>
                        <AltNav/>
                        <div className="credits-padding"/>
                    </div>
                </Modal>
                <CreditsModalButton onClick={this.openModal}/>
            </div>
        )
    }
}
