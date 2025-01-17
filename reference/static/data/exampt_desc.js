var dataDesc = [
  [
    "1",
    "EXEMPT1",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากเป็นส่วนราชการ หรือรัฐวิสาหกิจ เป็นต้น",
  ],
  [
    "2",
    "EXEMPT2",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากวัตถุประสงค์การนำไปใช้งานไม่ต้องขอใบอนุญาต/ใบรับรอง เช่น เป็นของตัวอย่าง หรือนำเข้าเพื่อการศึกษา เป็นต้น",
  ],
  [
    "3",
    "EXEMPT3",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากมีกฎหมายอื่นควบคุมและได้รับอนุญาตจากหน่วยงานที่ควบคุมแล้ว",
  ],
  [
    "4",
    "EXEMPT4",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากเป็นไปตามข้อตกลงระหว่างประเทศ",
  ],
  [
    "5",
    "EXEMPT5",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากปริมาณไม่ถึงเกณฑ์ที่ต้องขอใบอนุญาต/ใบรับรอง เช่น น้ำหนัก จำนวน ความเข้มข้น เป็นต้น",
  ],
  [
    "6",
    "EXEMPT6",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากราคาไม่ถึงเกณฑ์ที่ต้องขอใบอนุญาต/ใบรับรอง",
  ],
  [
    "7",
    "EXEMPT88",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากได้ยื่นใบอนุญาตหรือใบรับรองนำเข้าในเขตปลอดอากรในครั้งแรกแล้ว",
  ],
  ["8", "EXEMPT99", "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากกรณีอื่น ๆ"],
  [
    "9",
    "EXEMPT152",
    "ไม่ต้องมีใบอนุญาต/ใบรับรอง เนื่องจากนำเข้าในเขตปลอดอาการตามมาตรา 152 วรรค 1 แห่ง พ.ร.บ. ศุลกากร 2560",
  ],
];

$(document).ready(function () {
  $("#table-desc").DataTable({
    data: dataDesc,
    columns: [
      { title: "ลำดับ", className: "txt-center" },
      { title: "รหัสยกเว้น", className: "txt-center" },
      { title: "คำอธิบาย" },
    ],
    responsive: true,
    scroller: true,
  });

  dataTable.FixedHeader(table);
});