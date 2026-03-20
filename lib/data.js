function handleFile(e) {
  console.log("handleFile");
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
    (function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var workbook = XLSX.read(e.target.result, { type: 'binary' });
        handleWorkbook(workbook);
      };
      reader.readAsBinaryString(file);
    })(files[i]);
  }
  e.target.value = '';
}

function handlePrizeFile(e) {
  console.log("handlePrizeFile");
  WINNER = [];
  var files = e.target.files;
  for (var i = 0; i < files.length; i++) {
    (function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var workbook = XLSX.read(e.target.result, { type: 'binary' });
        handlePrizeWorkbook(workbook);
      };
      reader.readAsBinaryString(file);
    })(files[i]);
  }
}

function handleWorkbook(workbook) {
  console.log("handleWorkbook");
  var parsed = {};
  workbook.SheetNames.forEach(function (sheetName) {
    parsed[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  });
 
  DATA = parsed;
 
  console.log("Participants loaded:", DATA.Sheet1 ? DATA.Sheet1.length : 0);
  if (DATA.Sheet1 && DATA.Sheet1[0]) {
    console.log("First entry Mã NV:", DATA.Sheet1[0]["Mã NV"]);
  }
  
  runEvent();
}
 
function handlePrizeWorkbook(workbook) {
  console.log("handlePrizeWorkbook");
  var sheetName = workbook.SheetNames[0];
  var rows      = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
 
  PRIZES = rows
    .map(function (row) {
      return {
        tenGiai: row["Tên Giải"],
        qty: parseInt(row["QTY"], 10)
      };
    })
    .filter(function (p) { return p.tenGiai && p.qty > 0; });
 
  populatePrizeDropdown();
  console.log("Prizes loaded:", PRIZES);
 
  PRIZE_INDEX = 0;
  SPIN_LEFT   = PRIZES[0].qty;
  updatePrizeTitle();
  refreshPanel();
  runEvent();
}

function runEvent() {
  console.log("runEvent");
  if (PRIZES.length === 0 || DATA == null || DATA.Sheet1 == null) {
    return;
  }
  $('#configtime').hide();
  $('#numbers3').hide();
  $('#prizeselect').show();
  $('#showtime').show();
  mergeWinners();
}