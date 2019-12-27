// @ts-check
import React from 'react';

class YouTubeVideo extends React.Component {
    constructor(props) {
      super(props);
      this.init();
      this.video = this.props.id;//video id
      this.volume = 0;
      this.soundFadeStart = false;
  
      window['onYouTubeIframeAPIReady'] = (e) => {
        this.YT = window['YT'];
        this.reframed = false;
        this.player = new window['YT'].Player('player', {
          videoId: this.video,
          events: {
            'onStateChange': (e) => this.onPlayerStateChange(e),
            'onReady': (e) => {
                e.target.playVideo();
                e.target.setVolume(0);
                this.chooseRandomStart();
            }
          }
        });
      };
    }

    chooseRandomStart() {
        var duration = this.player.getDuration();
        this.player.seekTo(Math.floor(duration * Math.random()), true);
    }

    fadeInSound() {
        this.player.setVolume(this.volume)
        this.volume++;
    }

    onPlayerStateChange(event) {
        if (event.data === this.YT.PlayerState.PLAYING && !this.soundFadeStart) {
            this.fadeInSound()
            setInterval(() => this.fadeInSound(), 5000);
            this.soundFadeStart = true;
        }
    }

    render() {
      const style = `.max-width-1024 { max-width: 1024px; margin: 0 auto; display: none}`;
      return (
            <div>
                <style>{style}</style>
                <div className="max-width-1024">
                    <div className="embed-responsive embed-responsive-16by9" id="player"></div>
                </div>
            </div>
      );
    }

    init() {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
  }
  
  export default YouTubeVideo;