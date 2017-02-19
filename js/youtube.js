var el = require('./elements.js');

var youtube = {
  start: () => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
}

window.onYouTubeIframeAPIReady = () => {
  el.player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: el.data[0].videos[0],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

window.onPlayerReady = (event) => {}
window.onPlayerStateChange = (event) => {}

module.exports = youtube;
