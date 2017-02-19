/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var playlist = document.querySelector('.playlist');
var player = document.getElementById('player');

/**
 * Shared elements and variables
 */
var elements = {
  playlist: playlist,
  data: []
}

module.exports = elements;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var el = __webpack_require__(0);
var list = __webpack_require__(2);
var yt = __webpack_require__(3);

// Requesting videos.json and loading into data[]
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(this.readyState == 4 && this.status == 200){
    el.data = JSON.parse(this.responseText);

    // Print out all groups and videos from json response
    list.print(el.data, el.playlist);
    list.closeAllGroups();

    document.querySelector('.title').classList.add('lock');
    document.querySelector('.vid-link').classList.add('current');

    yt.start();
  }
};

xhr.open('GET', 'data/videos.json');
xhr.send();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var list = {
  /**
   * Prints all videos and groups from
   * the json data the playlist element
   */
  print: (data, playlist) => {

    // Loop through each topic/video group
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

  // Closes all video groups
  closeAllGroups: () => {
    var groups = document.querySelectorAll('.group');
    for (var i = 1; i < groups.length; i++) {
      toggle(groups[i]);
    }
  }
}
module.exports = list;

/*-=-=-=-=-=-=-=-=-=-=-=-
  Begin private methods
-=-=-=-=-=-=-=-=-=-=-=*/

/**
 * Called when video link is clicked.
 * Loads selected video into player.
 */
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

/**
 * Called when title is cliced.
 * Opens or closes the parent video group.
 */
function toggleParent(){
  toggle(this.parentNode);
}

/**
 * Shows or hides all video links in the group.
 */
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

/**
 * Hides the element
 */
function hide(element){
  element.classList.add('hidden');
}

/**
 * Shows the element
 */
function show(element){
  element.classList.remove('hidden');
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var el = __webpack_require__(0);

var youtube = {
  start: () => {
    // Adds script tag to load iframe api asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);