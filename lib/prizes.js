function spinPrize() {
  if (PRIZES.length == 0) {
    $("#configtime").addClass("flash");
    $("#configtime").one("animationend", function() {
      $(this).removeClass("flash");
    });
    return;
  }
  if (IS_IDLE) stopIdle();
  if (SPIN_LEFT <= 0) {
    moveToNextPrize();
    return;
  }
  if (!IS_SPINNING) {
    requestFullscreen();
    stopConfetti();
    chooseNew();
    setTimeout(doIt(), 1500);
    IS_SPINNING = true;
    $("#prizes_table [contenteditable]").attr("contenteditable", "false");
  }
  return;
}

function moveToNextPrize() {
  var anyLeft = false;
  for (var i = 0; i < PRIZES.length; i++) {
    if (PRIZES[i].qty > 0) {
      anyLeft = true;
      PRIZE_INDEX = i;
      SPIN_LEFT = PRIZES[i].qty;
      updatePrizeTitle();
      return;
    }
  }

  if (!anyLeft) {
    PRIZE_INDEX = -1;
    document.querySelector("#prize_title").innerText = "Hết giải!";
    exportWinners();
  }
}

function updatePrizeTitle() {
  var el = document.querySelector("#prize_title");
  if (PRIZE_INDEX >= 0 && PRIZE_INDEX < PRIZES.length) {
    el.innerText = 'Giải ' + PRIZES[PRIZE_INDEX].tenGiai + ' - ' + ' Còn ' + SPIN_LEFT + ' lượt';
    $("input[name='prize_select'][value='" + PRIZE_INDEX + "']").attr('checked', true);
  } else {
    for (var i = 0; i < PRIZES.length; i++) {
      if (PRIZES[i].qty > 0) {
        PRIZE_INDEX = i;
        SPIN_LEFT = PRIZES[i].qty;
        el.innerText = 'Giải ' + PRIZES[PRIZE_INDEX].tenGiai + ' - ' + ' Còn ' + SPIN_LEFT + ' lượt';
        $("input[name='prize_select'][value='" + PRIZE_INDEX + "']").attr('checked', true);
        return;
      }
    }
    el.innerText = "Hết giải!";
    exportWinners();
  }
}


function clearPrizeDropdown() {
  const select = document.getElementById('prizepick');
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
}

//function populatePrizeDropdown() {
  // const select = document.getElementById('prizepick');
  // PRIZES.forEach(function (prize, index) {
  //   const option = document.createElement('option');
  //   option.value = index;
  //   option.textContent = prize.tenGiai;
  //   select.appendChild(option);
  // });
//}