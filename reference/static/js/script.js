function newDoc() {
     
    document.location = "https://ecs-support.github.io/KM/customs/";
}

function displayPage(pages) {

    document.getElementById('header-img').style.display = "none";
    document.getElementById('show_pages').src = (pages);
}

$(document).ready(function () {
  var table = $("#table_ref").DataTable({
    responsive: true,
    scroller: true,
    scrollY: 600,
    scrollX: 700,
  });

  $.fn.dataTable.FixedHeader(table);
});