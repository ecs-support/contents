class sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

 <h1 id="main-tittle"></h1>

    <input type="checkbox" id="check">
    <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
    </label>
    <div class="sidebar">

        <header>Reference data</header>
        <ul>
            <li><a href="index.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a onclick="displayPage('exchange_rate.html')"><i class="far fa-money-bill-alt"></i>อัตราแลกเปลี่ยน</a>
            </li>

            <li><a href ="permission.html"><i class="far fa-file-alt"></i>ใบอนุญาต/ใบรับรอง </a> </li>

            <li><a href ='exampt.html'><i
                        class="far fa-calendar-check"></i>รหัสยกเว้นไม่ต้องมีใบอนุญาต</a></li>

            <li><a href ='stat_code.html'><i class="fas fa-sliders-h"></i>รหัสสถิติสินค้า</a></li>

            <li><a href ='unit_code.html'><i class=" fa fa-cubes"></i>รหัสหน่วยสินค้า</a></li>

            <li><a href ='package_code.html'><i class="fa fa-cube"></i>รหัสลักษณะหีบห่อ</a></li>

            <li><a href ='area_code.html'><i class="fas fa-map-marker-alt"></i>รหัสสถานที่</a></li>
            <li><a href ='port_code.html'><i class=" fa fa-ship fas fa-anchor"></i>รหัสท่า (ISO Port
                    Code)</a></li>

            <li><a href ='berth_no.html'><i class=" fa fa-anchor"></i>รหัสท่าเทียบเรือ</a></li>
            <li><a href ='part4_code.html'><i class="fas fa-tasks"></i>พิกัดศุลกากรภาค 4 </a></li>

            <li><a href ='privilege_code.html'><i class="far fa-address-card"></i>รหัสสิทธิพิเศษ</a>
            </li>
            <li><a href ='export_duty_rate.html'><i class="fas fa-plane"></i>พิกัดอัตราอากรขาออก</a>
            </li>

            <li><a href ='cartype_code.html'><i class="fas fa-truck"></i>รหัสประเภทรถ</a></li>
            <li><a href ='province_code.html'><i class="material-icons">account_balance</i>รหัสจังหวัด</a></li>
                         <li><a onclick="newDoc()"><i class="fas fa-external-link-alt"></i>กลับหน้าหลัก</a></li>
        </ul>
    </div>

      `;
  }
}

customElements.define("main-sidebar", sidebar);
