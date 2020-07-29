$(document).ready(function () {
    var table = $("#table_ref").DataTable({
      responsive: true,
      scroller: true,
      scrollY: 600,
      scrollX: 700,
    });
   
    $ .fn.dataTable.FixedHeader(table);
    
    var table_exam = $("#table_exampt").DataTable({
        responsive: true,
        scroller: true,
        scrollY: 600,
        scrollX: 700,
      });
     
      $ .fn.dataTable.FixedHeader(table_exam);
  
  });