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

    readonly twoDTwoCCollaborators: string[] = [
        'ChienHS',
        'Nyanako [NanakoTW]'
    ];

    readonly websiteContributors: string[] = [
        'DuongTyler (Frontend, Backend, Devops)',
        'Zapple (Frontend, Backend)',
        'LrJim (Frontend, Backend)',
        'Laska (Frontend)'
    ];

    readonly projectCreatorsAndLeads: string[] = [
        'XOF ("Dragon Heart" Game and original arts collection)',
        'Capt-Jules (Digital scrapbook)',
        'Revel (Original music for Coco)',
        'PheelGagg (Letters to Coco)',
        'jtron (Farewell song for Coco)',
        'BadGrammar (Coco Dance Animation)',
        'Kelanduo (World-level Giant Minecraft Fanart)'
    ];

    readonly artAndDesignContributors: string[] = [
        'nicooooooo (Coco brooch and asacoco tail assets)',
        'FriedPeanuts (Coco star hairpin asset)',
        'Rara (Diploma design and webpage tiling)',
        'Mr. Cres (Site background)',
        'Guy (Color consultant)'
    ];

    readonly coordinatorsAndOthers: string[] = [
        'Ice',
        'RazorNaitor',
        'Necrosis',
        'VintageGhost',
        'Kiwi & Hiroki (Community Message)'
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
                            {this.renderStringList(this.twoDTwoCCollaborators, '2D2C Collaborators')}
                            {this.renderStringList(this.websiteContributors, 'Website Contributors')}
                            {this.renderStringList(this.projectCreatorsAndLeads, 'Project Creators and Leads')}
                            {this.renderStringList(this.artAndDesignContributors, 'Art and Design Contributors')}
                            {this.renderStringList(this.coordinatorsAndOthers, 'Coordinators and Other Awesome Peoples in the Shadows')}
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
