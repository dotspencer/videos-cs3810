var el = require('./elements.js');
var list = require('./playlist.js');
var yt = require('./youtube.js');

// Requesting videos.json and loading into data[]
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    el.data = JSON.parse(this.responseText);

    list.print(el.data, el.playlist);
    list.closeAllGroups();

    document.querySelector('.title').classList.add('lock');
    document.querySelector('.vid-link').classList.add('current');

    yt.start();
  }
};

xhr.open('GET', 'data/videos.json');
xhr.send();
