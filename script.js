var playlist = document.querySelector('.playlist');
var data = [];

// Requesting videos.json and loading into data[]
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    data = JSON.parse(this.responseText);
    listAll(data);
    closeAllGroups();

    document.querySelector('.title').classList.add('lock');
    document.querySelector('.vid-link').classList.add('current');

    startYoutube();
  }
};

xhr.open('GET', 'videos.json');
xhr.send();

function listAll(data){
  for (var i = 0; i < data.length; i++) {
    var titleText = data[i].title;
    var vids = data[i].videos;

    var group = document.createElement('div');
    group.classList.add('group');

    var title = document.createElement('div');
    title.addEventListener('click', toggleParent);
    title.classList.add('title');
    title.innerText = titleText;

    group.appendChild(title);

    for (var j = 0; j < vids.length; j++) {
      var id = vids[j];
      var link = document.createElement('div');
      link.addEventListener('click', selectVideo);
      link.classList.add('vid-link');
      link.innerText = "Part: " + (j + 1);
      link.setAttribute('data-id', id);
      group.appendChild(link);
    }

    playlist.appendChild(group);
  }
}

function selectVideo() {

  // Clearing previous selected
  var previous = document.querySelector('.current');
  if(previous != null){
    previous.classList.remove('current');
  }
  this.classList.add('current');

  // Locking group open
  var pLock = document.querySelector('.lock');
  if(pLock != null){
    pLock.classList.remove('lock');
  }
  this.parentElement.querySelector('.title').classList.add('lock');

  player.loadVideoById(this.getAttribute('data-id'));
}

function closeAllGroups(){
  var groups = document.querySelectorAll('.group');
  for (var i = 1; i < groups.length; i++) {
    toggle(groups[i]);
  }
}

function toggleParent(){
  toggle(this.parentNode);
}

function toggle(group){
  var links = group.querySelectorAll('.vid-link');

  for (var i = 0; i < links.length; i++) {
    if(links[i].classList.contains('hidden')){
      show(links[i]);
    } else{
      hide(links[i]);
    }
  }
}

function hide(element){
  element.classList.add('hidden');
}

function show(element){
  element.classList.remove('hidden');
}

/*-=-=-=-=-=-=-=-=-*/

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

function startYoutube(){
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: data[0].videos[0],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 6000);
  //   done = true;
  // }
}

function stopVideo() {
  player.stopVideo();
}
