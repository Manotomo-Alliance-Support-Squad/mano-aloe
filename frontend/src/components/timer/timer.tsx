import React, { Component } from 'react'

import Coco_Dragon_1 from '../../assets/timer/Coco_Dragon_1.png';
import Coco_Dragon_2 from '../../assets/timer/Coco_Dragon_2.png';
import Coco_Dragon_3 from '../../assets/timer/dragon0.png';
import Coco_Dragon_4 from '../../assets/timer/dragon1.png';
import Haaton_1 from '../../assets/timer/Haaton_1.png';
import Haaton_2 from '../../assets/timer/Haaton_2.png';
import Haaton_3 from '../../assets/timer/haaton0.png';
import Haaton_4 from '../../assets/timer/haaton1.png';
import Haaton_5 from '../../assets/timer/haaton0-armsup.png';
import Haaton_6 from '../../assets/timer/haaton1-armsup.png';

import './timer.css';

interface TimerState 
{
    days:       number;
    hours:      number;
    minutes:    number;
    seconds:    number;
}

interface TimerProps 
{
    date: string;
}

export default class Timer extends Component<TimerProps, TimerState>
{

    timerid: any;
    state: TimerState = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    constructor(props: TimerProps) 
    {
        super(props);
    }

    componentDidMount(): void 
    {
        this.timerid = setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    componentDidUnmount(): void 
    {
        clearInterval(this.timerid);
    }

    updateTime(): void
    {
        const diff = (new Date(this.props.date)).getTime() - (new Date()).getTime();
        if (diff > 0)
        {
            this.setState({
                days     :   Math.floor( diff / (1000 * 60 * 60 * 24)),
                hours    :   Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes  :   Math.floor((diff / 1000 / 60) % 60),
                seconds  :   Math.floor((diff / 1000) % 60)
            });
        }
    }

    render()
    {
        return (
            <div className="timer-center">
                <div className="timer-container">
                    <div className="timer-overlay">
                        <img src={Coco_Dragon_1} id="coco1"   className="sprite"/>
                        <img src={Coco_Dragon_2} id="coco2"   className="sprite"/>
                        <img src={Coco_Dragon_3} id="coco3"   className="sprite-large"/>
                        <img src={Coco_Dragon_4} id="coco4"   className="sprite-large"/>
                        <img src={Haaton_1}      id="haaton1" className="sprite"/>
                        <img src={Haaton_2}      id="haaton2" className="sprite"/>
                        <img src={Haaton_3}      id="haaton3" className="sprite-large"/>
                        <img src={Haaton_4}      id="haaton4" className="sprite-large"/>
                        <img src={Haaton_5}      id="haaton5" className="sprite-large"/>
                        <img src={Haaton_6}      id="haaton6" className="sprite-large"/>
                    </div>
                    <div className="timer-counter">
                        <div className="timer-item">
                            <div>
                                {this.state.days}
                            </div>
                            <div>
                                Days
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.hours}
                            </div>
                            <div>
                                Hours 
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.minutes}
                            </div>
                            <div>
                                Minutes
                            </div>
                        </div>
                        <div className="timer-item">
                            <div>
                                {this.state.seconds}
                            </div>
                            <div>
                                Seconds
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
