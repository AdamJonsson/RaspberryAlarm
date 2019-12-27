// @ts-check

import React from 'react';
import YouTubeVideo from './youtube/youtube';

class WakeSound extends React.Component {

    youtubeVideoIDs = [
        'Qm846KdZN_c',
        'XxP8kxUn5bc',
        'xNN7iTA57jM',
        'pUdZFXsHk0o'
    ]

    constructor(props) {
        super(props);

        var randomVideoIndex = Math.floor(this.youtubeVideoIDs.length * Math.random());
        this.randomVideo = this.youtubeVideoIDs[randomVideoIndex];
    }

    render() {
        return (
            <YouTubeVideo id={this.randomVideo}/>
        );
    }
}
export default WakeSound;