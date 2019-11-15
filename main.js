$(document).ready(function () {
  // dynamicTable(4);
  showModal();

  $("select").change(function () {
    $("select").removeClass("invalid");
  });



});

var letters = "abcdefghijklmnopqrstuvwxyz";
var table = document.getElementById("my-table");
var length;
var gameMode;
var gridSize;
var gridColor;
var diskColorP1;
var diskColorP2;
var isClickListenerAdded = false;

var currentPlayer = 1;

function getCurrentPlayerColor() {
  if (currentPlayer === 1) {
    return diskColorP1.toLowerCase();
  }
  else {
    return diskColorP2.toLowerCase();
  }
}


function dynamicTable(x) {
  length = x + 2;
  table.innerHTML = "";
  for (var i = 0; i < x + 2; i++) {

    var row = table.insertRow(i);

    for (var j = 0; j < x + 2; j++) {
      row.insertCell(j);
    }
  }
  insertColLetters();
  insertRowNums();
  addDivs();
  enableStartbtn();
  enableRestartbtn();
}

function insertColLetters() {

  for (let i = 1; i < length - 1; i++) {
    var char = letters.charAt(i - 1);
    table.rows[0].cells[i].innerHTML = `<span class='columnLetter'>${char}</span>`;
    table.rows[length - 1].cells[i].innerHTML = `<span class='columnLetter'>${char}</span>`;

    //  Adding "edge" class for click detection
    table.rows[0].cells[i].classList.add("edge");
    table.rows[length - 1].cells[i].classList.add("edge");
  }
  table.rows[length - 1].cells[0].classList.add("edge");
  table.rows[length - 1].cells[length - 1].classList.add("edge");
}

function insertRowNums() {

  for (let i = 1; i < length - 1; i++) {
    var char = letters.charAt(i - 1);
    table.rows[i].cells[0].innerHTML = i;
    table.rows[i].cells[length - 1].innerHTML = i;

    //  Adding "edge" class for click detection
    table.rows[i].cells[0].classList.add("edge");
    table.rows[i].cells[length - 1].classList.add("edge");
  }
  table.rows[0].cells[0].classList.add("edge");
  table.rows[0].cells[length - 1].classList.add("edge");
}

function colorAllCells(color) {
  document.querySelectorAll("#my-table td:not(.edge)").forEach(function (e) {
    e.style.backgroundColor = color;
  });
}

function colorInnerCells(color) {

  for (let i = 1; i < length - 1; i++) {
    for (let j = 1; j < length - 1; j++) {
      table.rows[i].cells[j].style.backgroundColor = color;
    }
  }
}

var isClockRunning = false;
var timer = undefined;
var sec = 0;
var min = 0;

function startTimer() {
  if (!isClockRunning) {
    isClockRunning = true;
    timer = setInterval(clock, 1000);
    enableBoard();
    changeToPause();
  } else {
    pauseGame();
    clearInterval(timer);
  }
  addClickListener();
  // toggleHoverableSquares();
}

function pauseGame() {
  if (isClockRunning) {
    isClockRunning = false;
    changeToStart();
    disableBoard();
  }
}

function clock() {
  var clock = $("#clock");

  sec++;
  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  clock.text(toDD(min) + ":" + toDD(sec));
}

function toDD(n) {
  return String(n).padStart(2, "0");
}

function restartGame() {
  location.reload();
}

function resetTimer() {
  var clock = $("#clock");
  clearInterval(timer);
  isClockRunning = false;
  clock.text("00:00");
  sec = 0;
  min = 0;
}

function addClickListener() {
  if (isClickListenerAdded) {
    return false;
  }

  isClickListenerAdded = true;
  $("td:not(.edge) > .fill-container").click(function (e) {
    console.log(e);
    var disk = e.target.firstChild;

    if ($(disk).hasClass("disk")) {
      e.stopPropagation();
      console.log("has disk");
      return;
    }

    $(disk).addClass("disk");
    if (currentPlayer == 1) {
      $(disk).addClass("player1Style");
      $(disk).css('background-color', diskColorP1);
      // let playerscore = $("#player1score");
      // playerscore.val(playerscore.val() + 1);
      // console.log(playerscore);
      // $(disk).removeClass("player2Style");
    } else {
      // let playerscore = $("#player2score");
      // playerscore.val(playerscore.val() + 1);
      $(disk).addClass("player2Style");
      $(disk).css('background-color', diskColorP2);
      // $(disk).removeClass("player1Style");
    }
    // flipAllDirections()

    changePlayer();
    toggleHoverableSquares();
  });
}

function addDivs() {
  $("td:not(.edge)").append("<div class='fill-container'><div></div></div>");
}

function removeDisks() {
  $("td:not(.edge) .disk").removeClass();
}

function enableStartbtn() {
  $("#start-btn").removeAttr("disabled");
}

function disableStartbtn() {
  $("#start-btn").attr("disabled", true);
}

function enableRestartbtn() {
  $("#reset-btn").removeAttr("disabled");
}

function disableRestartbtn() {
  $("#reset-btn").attr("disabled", true);
}

function changeToPause() {
  $("#start-btn").text("Pause Game");
}

function changeToStart() {
  $("#start-btn").text("Start Game");
}

function changeDiskColor(newColor, playerClass) {
  var disks = $(playerClass);
  for (var i = 0; i < disks.length; i++) {
    disks[i].style.backgroundColor = newColor;
  }
}

function showModal() {
  $('#start-game-modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  });
}

function hideModal() {
  $('#start-game-modal').modal('hide');
}

function updateGameMode(gameModeValue) {
  gameMode = gameModeValue;
}

function updateGridSize(gridSizeValue) {
  gridSize = Number(gridSizeValue.split('X')[0]);
}

function updateGridColor(gridColorValue) {
  gridColor = gridColorValue.toLowerCase();
}

function updateDiskColorP1(diskColorValue) {
  diskColorP1 = diskColorP2 === diskColorValue ? "dark" + diskColorValue : diskColorValue;
  // $('.player1Style').css('background-color', diskColorP1);
}

function updateDiskColorP2(diskColorValue) {
  diskColorP2 = diskColorP1 === diskColorValue ? "dark" + diskColorValue : diskColorValue;
  // $('.player2Style').css('background-color', diskColorP2);

}

function finishedForm() {
  // Setting defaults for testing
  setDefaults();

  dynamicTable(gridSize);
  colorAllCells(gridColor);
  hideModal();
  startResumeGame();
  setboard();
}

function changePlayer() {
  var currentPlayerTurn = "currentPlayerTurn";
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  $(".playerNames").css("backgroundColor", "transparent");
  $("#player" + currentPlayer + "Name").css("backgroundColor", getCurrentPlayerColor());

}

function setboard() {
  var i = gridSize / 2;
  var j = gridSize / 2;
  table.rows[i].cells[j].firstChild.click();
  table.rows[i].cells[j + 1].firstChild.click();
  table.rows[i + 1].cells[j + 1].firstChild.click();
  table.rows[i + 1].cells[j].firstChild.click();
}

function setDefaults() {
  updateGameMode($("#game-mode-menu").val());
  updateGridSize($("#grid-size-menu").val());
  updateGridColor($("#grid-color-menu").val());
  updateDiskColorP1($("#disk-color-menu1").val());
  updateDiskColorP2($("#disk-color-menu2").val());
}

function startResumeGame() {
  $("#start-btn").click()
}

function resetValues() {
  currentPlayer = 1;
}

function disableBoard() {
  $("#my-table > tbody").css("pointer-events", "none");
}

function enableBoard() {
  $("#my-table > tbody").css("pointer-events", "unset");
}

function toggleHoverableSquares() {
  // $("#my-table td:has('.disk')").addClass("notHoverable");

  // --------------------------------------------------------

  for (let i = 1; i < table.rows.length - 1; i++) {
    for (let j = 1; j < table.rows[i].cells.length - 1; j++) {
      let cell = $(table.rows[i].cells[j]);
      // if ($(cell).hasClass("edge")){
      //   continue;
      // }

      if (isSquareClickable(i, j)) {
        $(cell).removeClass("notHoverable");
      } else {
        $(cell).addClass("notHoverable");
      }
    }
  }
}

function isDirectionClickable(i, j, foundOP, op1, op2) {
  // console.log(i,j,foundOP,op1,op2);
  if ($(table.rows[i].cells[j]).hasClass('edge')) {
    // console.log(i,j,"edgeHit");
    return false;
  }
  else if (!hasDiskChild(i, j)) {
    // console.log(i,j,"nodisk");
    return false;
  }
  else if (getCurrentPlayerColor() !== getDiskColor(i, j)) {
    // console.log(i,j,"oppositeColor", getCurrentPlayerColor(), getDiskColor(i,j),true);
    return isDirectionClickable(i + (op1), j + (op2), true, op1, op2);
  }
  // console.log(i,j,"samecolor",foundOP);
  return foundOP;

}

function flipDirection(i, j, op1, op2) {
  // console.log(i,j,foundOP,op1,op2);
  if ($(table.rows[i].cells[j]).hasClass('edge')) {
    // console.log(i,j,"edgeHit");
    return;
  }
  else if (!hasDiskChild(i, j)) {
    // console.log(i,j,"nodisk");
    return;
  }
  else if (getCurrentPlayerColor() !== getDiskColor(i, j)) {
    flipDisk(i,j);
    // console.log(i,j,"oppositeColor", getCurrentPlayerColor(), getDiskColor(i,j),true);
    flipDirection(i + (op1), j + (op2), op1, op2);
  }
  // console.log(i,j,"samecolor",foundOP);

}

function hasDiskChild(i, j) {
  return $(table.rows[i].cells[j]).find(".disk").length === 1;
}

function getDiskColor(i, j) {
  if (!hasDiskChild(i, j)) return "transparent";
  return $(table.rows[i].cells[j]).find(".disk")[0].style.backgroundColor;

}

function isSquareClickable(i, j) {
  if (hasDiskChild(i, j)) return false
  if (isDirectionClickable(i - 1, j, false, -1, 0)) return true;
  if (isDirectionClickable(i - 1, j + 1, false, -1, 1)) return true;
  if (isDirectionClickable(i, j + 1, false, 0, 1)) return true;
  if (isDirectionClickable(i + 1, j + 1, false, 1, 1)) return true;
  if (isDirectionClickable(i + 1, j, false, 1, 0)) return true;
  if (isDirectionClickable(i + 1, j - 1, false, 1, -1)) return true;
  if (isDirectionClickable(i, j - 1, false, 0, -1)) return true;
  if (isDirectionClickable(i - 1, j - 1, false, -1, -1)) return true;
  return false;
}

function flipDisk(i, j) {
  let newColor = getCurrentPlayerColor();
  let cell = $($(table.rows[i].cells[j])[0]).find(".disk");
  cell.removeClass("player1Style player2Style");
  cell.addClass("player"+currentPlayer+"Style");
  cell.css("backgroundColor", newColor);
  
  let currentPlayerScore = $("player"+currentPlayer+"score");

  let player1score = $("#player1score");
  let player2score = $("#player2score");
  if (currentPlayer === 1) {
    player1score.val(player1score.val() + 1);
    player2score.val(player2score.val() - 1);
  } else {
    player1score.val(player1score.val() - 1);
    player2score.val(player2score.val() + 1);
  }
  
}