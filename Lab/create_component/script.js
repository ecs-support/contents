class sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
       
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    
        <script src="https://kit.fontawesome.com/a076d05399.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <link rel="stylesheet" href="main_page.css">

        <img src="ECS_Logo_2020.png" class="logo_ecs" id="logo" onclick="newDoc()">  
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

            <li><a onclick="displayPage('permission.html')"><i class="far fa-file-alt"></i>ใบอนุญาต/ใบรับรอง </a> </li>

            <li><a onclick="displayPage('exampt.html')"><i
                        class="far fa-calendar-check"></i>รหัสยกเว้นไม่ต้องมีใบอนุญาต</a></li>

            <li><a onclick="displayPage('stat_code.html')"><i class="fas fa-sliders-h"></i>รหัสสถิติสินค้า</a></li>

            <li><a onclick="displayPage('unit_code.html')"><i class=" fa fa-cubes"></i>รหัสหน่วยสินค้า</a></li>

            <li><a onclick="displayPage('package_code.html')"><i class="fa fa-cube"></i>รหัสลักษณะหีบห่อ</a></li>

            <li><a onclick="displayPage('area_code.html')"><i class="fas fa-map-marker-alt"></i>รหัสสถานที่</a></li>
            <li><a onclick="displayPage('port_code.html')"><i class=" fa fa-ship fas fa-anchor"></i>รหัสท่า (ISO Port
                    Code)</a></li>

            <li><a onclick="displayPage('berth_no.html')"><i class=" fa fa-anchor"></i>รหัสท่าเทียบเรือ</a></li>
            <li><a onclick="displayPage('part4_code.html')"><i class="fas fa-tasks"></i>พิกัดศุลกากรภาค 4 </a></li>

            <li><a onclick="displayPage('privilege_code.html')"><i class="far fa-address-card"></i>รหัสสิทธิพิเศษ</a>
            </li>
            <li><a onclick="displayPage('export_duty_rate.html')"><i class="fas fa-plane"></i>พิกัดอัตราอากรขาออก</a>
            </li>

            <li><a href="link-01.html" target="_blank"></i>ประเภทรถ</a></li>
            <li><a href="province_code.html" target="_blank"></i>รหัสจังหวัด</a></li>
            <li><a onclick="newDoc()"><i class="fas fa-external-link-alt"></i>กลับหน้าหลัก</a></li>
        </ul>
    </div>
      
    `;
    }
}



customElements.define('main-sidebar', sidebar);