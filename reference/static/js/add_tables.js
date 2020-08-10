class add_table extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

<div class="row top_right">
         <a href="static/files/birth_code.xlsx" target="_blank">
             <i class=" fas fa-file-excel" style="font-size:30px;color:#264E36;"></i>
         </a>

     </div>
  
    <div class='container-fluid'>

        <h2>รหัสท่าเทียบเรือ (Berth No.)</h2>
         <table id="table-ref" class="table table-striped table-bordered" style="width:100%">
        </table>
        <p class='txt-update'>อัพเดทข้มูลล่าสุด : 1 มิ.ย. 2563</p>
    </div>
<script>

$(document).ready(function () {
    var table = $("#table_ref").DataTable({
      responsive: true,
      scroller: true,
      scrollY: 600,
      scrollX: 700,
    });
   
    $ .fn.dataTable.FixedHeader(table);
    
  
  });

</script>
       
    `;
  }
}

customElements.define("main-table", add_table);