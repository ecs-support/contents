let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.responseText).feed.entry;

    let i;
    for (i = 0; i < data.length; i++) {
      let code = data[i]["gsx$code"]["$t"];
      let name = data[i]["gsx$name"]["$t"];
      let releaseex = data[i]["gsx$releaseex"]["$t"];
      let loadex = data[i]["gsx$loadex"]["$t"];
      let releaseim = data[i]["gsx$releaseim"]["$t"];
      let loadim = data[i]["gsx$loadim"]["$t"];



      document.getElementById("demo").innerHTML +=
        "<tr>" +
        "<td>" +
        code +
        "</td>" +
        "<td>" +
        name +
        "</td>" +
        "<td>" +
        releaseex +
        "</td>" +
        "<td>" +
        loadex +
        "</td>" +
        "<td>" +
        releaseim +
        "</td>" +
        "<td>" +
        loadim +
        "</td>" +
        "</tr>";
    }
  }
};

xmlhttp.open(
  "GET",
  "https://spreadsheets.google.com/feeds/list/16-ZJ7u3xfoh1q1XGVLA5dKWRH-YwIVqJBTQuiEUwaas/od6/public/values?alt=json",
  true
);
xmlhttp.send();