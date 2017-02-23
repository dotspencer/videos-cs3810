var el = require('./elements.js');

var youtube = {
  start: () => {
    // Adds script tag to load iframe api asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  showDuration: () => {
    var vidsPerRequest = 30;

    var vids = getAllVideos(el.data);
    while(vids.length > 0){
      var requestGroup = vids.splice(0, vidsPerRequest);
      requestDurationGroup(requestGroup);
    }
  }
}

function requestDurationGroup(requestGroup){
  // Setup api base
  var p = atob("JmtleT1BSXphU3lDUkZwZnhYQlE0d292cDhxSGJIZmF4YklDUzVyZnZDVmM=");
  p += "&part=contentDetails";
  var url = "https://www.googleapis.com/youtube/v3/videos?id=";

  // Construt request url from each video id
  for (var i = 0; i < requestGroup.length; i++) {
    url += requestGroup[i] + ",";
  }
  url += p;

  // Make request
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      showDurationGroup(response);
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function showDurationGroup(response){
  var items = response.items;
  for (var i = 0; i < items.length; i++) {
    var link = document.querySelector("[data-id='" + items[i].id + "']");

    var time = items[i].contentDetails.duration;
    time = time.replace("PT", "");  // Remove 'PT'
    time = time.replace(/(\d[A-Z])/g, "$1 "); // Split at minute, second, etc.
    time = time.toLowerCase();

    var span = Duration(time);
    link.appendChild(span);
  }
}

/**
 * Returns all video IDs from the data
 */
function getAllVideos(data){
  var videos = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].videos.length; j++) {
      videos.push(data[i].videos[j]);
    }
  }
  return videos;
}

/**
 * Creates new duration element
 *
 * Example:
 * <span class="duration">12m 30s</span>
 */
function Duration(time) {
  var d = document.createElement('span');
  d.classList.add('duration');
  d.innerText = time;
  return d;
}

/**
 * Iframe api is ready callback
 */
window.onYouTubeIframeAPIReady = () => {
  el.player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: el.data[0].videos[0],
    playerVars: {
      // modestbranding: 1,
      rel: 0 // Related videos off
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

window.onPlayerReady = (event) => {}
window.onPlayerStateChange = (event) => {}

module.exports = youtube;
