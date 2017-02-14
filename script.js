var playlist = document.querySelector('.player');
var data = [];

// Requesting videos.json and loading into data[]
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    videos = JSON.parse(this.responseText);
    show(videos);
  }
};

xhr.open('GET', 'videos.json');
xhr.send();

function show(){
  for (var i = 0; i < data.length; i++) {
    var titleText = data.title;
    var vids = data.videos;

    var group = document.createElement('div');
    group.classList.add('group');

    var title = document.createElement('div');
    title.classList.add('title');
    title.innerText = titleText;

    group.appendChild(title);

    for (var j = 0; j < vids.length; j++) {
      var id = vids[j];
    }
  }
}

/*-=-=-=-=-=-=-=-=-*/

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}
