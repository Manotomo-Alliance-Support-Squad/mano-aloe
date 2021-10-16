import { Component } from 'react';
import '../../shared/globalStyles/global.css';
import './header.css';

import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import Manotomo1 from '../../assets/sprites/manotomo1.png'
import Manotomo2 from '../../assets/sprites/manotomo2.png'

interface HeaderState {
}

interface HeaderProps {

}

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    renderDefaultHeader(): JSX.Element {
        return (
            <header id="header" className="app-header">
                <div className="community-message-card">
                    <h1 className="community-message-header">A Community Message for Aloe</h1>
                    <div className="community-message-body">
                        <p>Dear Aloe, thank you for everything. While it may have been but for a short while, we appreciate every little thing you've given us. We wish you the best of luck going forward.</p>
                        <p>親愛なるアロエ様。短い間ではありましたが、一緒に過ごした時間に心より感謝しております。本当にありがとうございました。アロエ様のご健勝とご多幸をお祈り申し上げます。</p>
                    </div>
                </div>
                <div style={{height: 100}}/>
            </header>
        )
    }
    
    renderBirthdayHeader(): JSX.Element {
        return (
            <>
                <header className="app-header app-birthday-header">
                    <div style={{height: 50}}/>
                    <img id="manotomo1" src={Manotomo1}/>
                    <img id="manotomo2" src={Manotomo2}/>
                </header>
                <div id="bday-card" className="bday-msg-container">
                    <div className="community-message-card birthday-card">
                        <h1 className="community-message-header">Happy Birthday, Aloe</h1>
                        <div className="community-message-body text-center">
                            <p>お誕生日おめでとうございます</p>
                            <p>お元気でいらっしゃいますか</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        let today: Date = new Date();
        if (today.getDate() == 28 && today.getMonth() == 9) //Oct 28th
            return this.renderBirthdayHeader();
        return this.renderDefaultHeader();
    }
}
