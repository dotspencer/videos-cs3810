// Lists all videos from json data

var list = {
  print: (data, playlist) => {
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
  },

  closeAllGroups: () => {
    var groups = document.querySelectorAll('.group');
    for (var i = 1; i < groups.length; i++) {
      toggle(groups[i]);
    }
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

  el.player.loadVideoById(this.getAttribute('data-id'));
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

module.exports = list;
