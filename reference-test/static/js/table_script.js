$(document).ready(function () {
  var table = $("#table_ref").DataTable({
    responsive: true,
    scroller: true,
    scrollY: 600,
    scrollX: 700,
  });
 
  $ .fn.dataTable.FixedHeader(table);
  

});
