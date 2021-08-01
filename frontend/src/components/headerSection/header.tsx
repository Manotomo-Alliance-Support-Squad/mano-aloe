import { Component } from 'react';
import AltNav from '../navigation/altnav';
import '../../shared/globalStyles/global.css';
import './header.css';


interface HeaderState {
}

interface HeaderProps {

}

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
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
}
