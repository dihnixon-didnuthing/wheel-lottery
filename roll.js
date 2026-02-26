function animatefunction(a,b)
{
  a.html(a + " " + b);
}

function reanimate(slot) {
  animate(slot,0);
}

var totalheight = 1000.0;
var numoffset = totalheight / 10;
var chosen = 0;
var job = "";
var json = {};
var person = {};
var numfunctions = [reanimate,reanimate,reanimate,reanimate,reanimate,reanimate,reanimate];
var t = 2000;
var remainning = 0;
var surprise = false;
var current_prize = 9;
var prizes = [];
var prizeindex = 0;
var spinleft = 0;
var currentWinner = null;

function animate(slot,offset) {
  var time = t * (totalheight - offset) / totalheight;  
  offset = String(-offset) + "px";
  var s = slot;
  var sel = "#num" + slot;
  $(sel).css({backgroundPosition: "0px " + offset});
  var topscroll = String(-totalheight) + "px";
  $(sel).animate({ backgroundPosition: "(0px " + topscroll + ")" }, time, 'linear', function() { var f = numfunctions[s]; f(s,0); });
}

function r(max) {
  return Math.floor(Math.random() * max);
}

function choosenew() {
  // var max = parseInt($('#maxroll').attr('value'));
  var max = 1;
  var repick=true;
  while(repick) {
    repick = false;
    if(json!=null && json.Sheet1!=null && json.Sheet1.length>0){
      max = json.Sheet1.length-1;
      var fl = true;
      var count = 0;
      while(fl){
        person = json.Sheet1[r(max)];
        // person = json.Sheet1.find(fruit => fruit["Mã NV"]=909190);
        fl = winner.includes(person);
        count++;
        if(count>10000){
          location.reload();
          return;
        }
      }
      currentWinner = person;
      chosen = parseInt(person["Mã NV"]);
      department = person["Lĩnh vực chuyên môn"];
      console.log("Chosen: "+chosen);
      console.log("Department: "+department);
    } else {
      chosen = 1;
    }
    $('.prize .winner').each(function(i,v) { if($(v).html() == String(chosen)) { repick = true; } });
  }
  //$("#rand").html(chosen);
  $('#numbers3').hide();
}

function moveToNextPrize() {
  if (prizeindex + 1 < prizes.length) {
    prizeindex++;
    spinleft = prizes[prizeindex].qty;
    updateprizeTitle();
  } else {
    // All prizes done
    prizeindex = -1;
    spinleft = 0;
    updateprizeTitle();
    console.log("No more prize");
  }
}

//Exampel result(4) with chosen being 4931 
//append 0s to chosen > 0004953
//result(2) being third number, 0 
function result(index) {
  var c = String(chosen);
  if(chosen < 9) {
    c = "000" + c;
  } else if(chosen < 99) {
    c = "00" + c;
  } else if(chosen < 999) {
    c = "0" + c;
  } else if(chosen < 9999) {
    c = c;
  } else if(chosen < 99999) {
    c = "00" + c;
  } else if(chosen < 999999) {
    c = "0" + c;
  }
  return parseInt(c[index]);
}

function dostop(slot) {
  if(slot > 6)
    return;

  var sel = "#num" + slot;

  var offset = -result(slot) * numoffset;
  var time = t * (-offset) / totalheight;
  offset = String(offset) + "px";

  var s = slot;
  //$(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, time, 'linear', function() { stop(s + 1); });

  remainning--;
  if (remainning == 0 && surprise) {
    var virtual_offset = -result(slot) * numoffset + numoffset * 5;
    virtual_offset = String(virtual_offset) + "px";
    $(sel).css({backgroundPosition: "0px " + virtual_offset});
    $(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, 9000, 'linear', function() { slotstopped(s) });
  }
  else {
    $(sel).css({backgroundPosition: "0px 0px"});
    $(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, time, 'linear', function() { slotstopped(s) });
  }

  return 1;
}

function slotstopped(slot) {
  $('#num' + slot).css('border','0px solid transparent');
  numfunctions[slot] = null;
  if(numfunctions[0] == null && numfunctions[1] == null && numfunctions[2] == null && numfunctions[3] == null) {
    document.querySelector("#report").innerText = person["Họ và tên"] + " - " + department;
    winner.push({ ...person, prize: prizes[prizeindex].tenGiai });
    $('#numbers3').show();
    
    //if (current_prize < 2) {
    //  $('#numbers2').addClass('zoomin');
    //  $('#numbers3').addClass('zoomin');
    //}
    if (prizes.length > 0 && prizeindex >= 0 && prizeindex < prizes.length) {
      spinleft--;
      updateprizeTitle();

    if (spinleft === 0) {
        moveToNextPrize();
      } 
    }
  }
}

function doit() {
  remainning = 7;
  $('#numbers2').removeClass('zoomin');
  $('#numbers3').removeClass('zoomin');

  for (var i = 6; i >= 0; i--) {
    $('#num'+i).stop().css('border','0px solid black');
    numfunctions[i] = reanimate;
    animate(i,-r(totalheight));
  }
  
  // $('#num1').stop().css('border','1px solid black');
  // $('#num2').stop().css('border','1px solid black');
  // $('#num3').stop().css('border','1px solid black');
  // $('#num4').stop().css('border','1px solid black');
  // $('#num5').stop().css('border','1px solid black');
  // $('#num6').stop().css('border','1px solid black');

  
  // numfunctions[1] = reanimate;
  // numfunctions[2] = reanimate;
  // numfunctions[3] = reanimate;
  // numfunctions[4] = reanimate;
  // numfunctions[5] = reanimate;
  // numfunctions[6] = reanimate;
  
  
  // animate(1,-r(totalheight));
  // animate(2,-r(totalheight));
  // animate(3,-r(totalheight));
  // animate(4,-r(totalheight));
  // animate(5,-r(totalheight));
  // animate(6,-r(totalheight));
}

function stop(num) {
  if(num == 7) {
    surprise = false;
    for (var i = 6; i >= 0; i--) {
      if(numfunctions[i]!=null)
        numfunctions[i] = dostop;
    }
    return;
  }

  surprise = true;
  //instruct numfunctions[] =
  numfunctions[num] = dostop;
}

var curroll = null;

function loadprize(num) {
  // if( $(this).find('.winner').html() != "") {
  //   return;
  // }

  // curroll = this.id;

  // $('.d').css('border','none');
  // $(this).find('.d').css('border','10px solid green');
/*
  var amount = $(this).find('.amount').html();

  $('#prizeinfo').html(amount);
  // $('#prizeinfo').animate({backgroundColor: 'red'}, 2000);
  $('#prizeinfo').stop();
  $('#prizeinfo').css('backgroundColor','white');
  */

  /*
  if(amount == "Grand Prize $3,000") {
    $('#prizeinfo').pulse({backgroundColors: ['white','pink']}, 2000);
  }
  */
  current_prize = num;
  $('body').css('background-image', 'url(./backdrop/'+num+'.jpg)');
  choosenew();
  doit();
}

function spinprize() {
  if (prizes.length === 0 || prizeindex < 0 || prizeindex >= prizes.length) {
    alert("Không có giải nào để quay.");
    return;
  }

  if (spinleft <= 0) {
    // This should not happen if moveToNextPrize works, but just in case
    moveToNextPrize();
    return;
  }

  choosenew();
  doit();
}

function reset() {
  console.log("reset");
  for (var i = 6; i >= 0; i--) {
    //reanimate(i)
    var sel = "#num" + i;
    $(sel).stop().css({backgroundPosition: "0px 0px"});
  };
  $('#numbers3').hide();
}
function runevent() {
  console.log("runevent");
  // var max = parseInt($('#numprizes').attr('value'));
  // var incr = parseInt($('#prizeincr').attr('value'));  
  // var dollar = parseInt($('#startdollar').attr('value'));  
  // var prizes = $('#prizes');
  // var i;
  // for(i=1;i<=max;i++) {
  //   prizes.append("<tr class='prize' id='prize" + i + "'><td class='amount'><div class='d'>$" + dollar + "</div></td><td><div class='winner'></div></td></tr>");
  //   dollar += incr;
  // }
  // prizes.append("<tr class='prize' id='prize" + i + "'><td class='amount'><div class='d'>Grand Prize $3,000</div></td><td><div class='winner'></div></td></tr>");

  // var prize = $('.prize');
  // var h = $(window).height() / prize.size() * 0.020;
  // prize.css('font-size',String(h) + 'px');

  // prize.click(loadprize);
  
  $('#configtime').hide();
  $('#numbers3').hide();
  $('#showtime').show();
}
var winner = [];
function handleFile(e) {
  console.log("handleFile");
  winner = [];
  var files = e.target.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});
      handleWorkbook(workbook);
    };
    reader.readAsBinaryString(f);
  }
}

function handleprizeFile(e) {
  console.log("handleprizeFile");
  winner = [];
  var files = e.target.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      var workbook = XLSX.read(data, {type: 'binary'});
      handleprizeWorkbook(workbook);
    };
    reader.readAsBinaryString(f);
  }
}

function handleprizeWorkbook(workbook) {
  console.log("handleprizeFile loaded");
  
  var sheetName = workbook.SheetNames[0];
  var sheet = workbook.Sheets[sheetName];
  var rows = XLSX.utils.sheet_to_json(sheet);
  
  prizes = rows.map(row => ({
    tenGiai: row["Tên Giải"],
    qty: parseInt(row["QTY"], 10)
  })).filter(p => p.tenGiai && p.qty > 0);

  console.log("Prizes loaded:", prizes);

  // Start with the first prize
  prizeindex = 0;
  spinleft = prizes[0].qty;
  updateprizeTitle();
}

function updateprizeTitle() {
  if (prizeindex >= 0 && prizeindex < prizes.length) {
    var prize = prizes[prizeindex];
    document.querySelector("#prize_title").innerText = 
      'Giải: '+ prize.tenGiai+' - Còn '+spinleft+' lượt';
  } else {
    document.querySelector("#prize_title").innerText = "Hết giải!";
  }
}

function exportwinners() {
    if (!winner || winner.length === 0) {
        alert("No winners to export");
        return;
    }

    var exportData = winner.map(function(person, index) {
        return {
            "STT": index + 1,
            "Mã NV": person["Mã NV"],
            "Họ và tên": person["Họ và tên"],
            "Lĩnh vực chuyên môn": person["Lĩnh vực chuyên môn"],
            "Giải: ": person.prize,
        };
    });

    var ws = XLSX.utils.json_to_sheet(exportData);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Winners");
    XLSX.writeFile(wb, "danh_sach_trung_thuong.xlsx");
}


// function handleDownload(content) {
  // console.log("handleFile");
  // console.log(this.json);
  // var blob = new Blob([ content ], { "type" : "text/plain" });
  // if (window.navigator.msSaveBlob) {
  //   window.navigator.msSaveBlob(blob, "test.txt");
  //   // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
  //   window.navigator.msSaveOrOpenBlob(blob, "test.txt");
  // } else {
  //   // var download = document.querySelector("#download");
  //   // download.href = window.URL.createObjectURL(blob);
  //   // download.style = "display: inline;";
  // }
// }

function handleWorkbook(workbook) {
  console.log("handleDownload");
  var json = {};
  workbook.SheetNames.forEach(function(sheetName){
    var sheet = workbook.Sheets[sheetName];
    json[sheetName] = XLSX.utils.sheet_to_json(sheet);
  });
  this.json = json;
  // console.log(this.json);
  console.log("length: "+json.Sheet1.length);
  console.log(json.Sheet1[0]["Mã NV"] +" why?");
  // this.json = JSON.stringify(json, null, 2);
  //document.querySelector("#output").innerText = content;
  // handleDownload(this.json);
  runevent();
}

document.querySelector("#file").addEventListener('change', handleFile, false);
document.querySelector("#file2").addEventListener('change', handleprizeFile, false);

$(function() {
    choosenew();
});
