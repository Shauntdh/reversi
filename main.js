$(document).ready(function () {
  dynamicTable(4);
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

var currentPlayer = 1;


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
  document.querySelectorAll("#my-table td").forEach(function (e) {
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
    changeToPause();
  } else {
    pauseGame();
    clearInterval(timer);
  }
  addClickListener();
}

function pauseGame() {
  if (isClockRunning) {
    isClockRunning = false;
    changeToStart();
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
  resetTimer();
  removeDisks();
  startTimer();
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
  $("td:not(.edge) > .fill-container").click(function (e) {
    var disk = e.target.firstChild;

    if ($(disk).hasClass("disk")) {
      e.stopPropagation();
      console.log("has disk");
      return;
    }

    $(disk).addClass("disk");
    if (currentPlayer == 1) {
      $(disk).addClass("player1Style");
      $(disk).removeClass("player2Style");
    } else {
      $(disk).addClass("player2Style");
      $(disk).removeClass("player1Style");
    }
    changePlayer();
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
  $('.player1Style').css('background-color', diskColorP1);
}

function updateDiskColorP2(diskColorValue) {
  diskColorP2 = diskColorP1 === diskColorValue ? "dark" + diskColorValue : diskColorValue;
  $('.player2Style').css('background-color', diskColorP2);

}

function finishedForm() {
  dynamicTable(gridSize);
  colorAllCells(gridColor);
  hideModal();
}

function changePlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  console.log(currentPlayer);
}
