/*-=-=-=-=-
 Run on http://www.cs.utah.edu/~rajeev/cs3810/ to generate videos.json
=-=-=-=-=-*/

var videos = [];

for (var i = 0; i < rows.length; i++) {
  var cells = rows[i].querySelectorAll('td');
  if (cells.length == 0) {
    continue;
  }

  var title = cells[1].innerText;
  title = title.substring(0, title.length - 1);
  var vid_links = cells[4].querySelectorAll('a');

  if (vid_links.length == 0) {
    continue;
  }

  var group = {
    title: title,
    videos: []
  };

  for (var j = 0; j < vid_links.length; j++) {
    if (vid_links[j].innerText.indexOf('Note') != -1) {
      continue;
    }
    var id = vid_links[j].href.split("/").pop();
    group.videos.push(id);
  }

  videos.push(group);
}

JSON.stringify(videos, null, 2);
