$(document).ready(function () {
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
    var disk = e.target.firstChild;

    if ($(disk).hasClass("disk")) {
      e.stopPropagation();
      return;
    }

    $(disk).addClass("disk");
    if (currentPlayer == 1) {
      $(disk).addClass("player1Style");
      $(disk).css('background-color', diskColorP1);
      let playerscore = $("#player1score");
      playerscore.val(playerscore.val("playerscore + 1"));
      
    } else {
      let playerscore = $("#player2score");
      playerscore.val(playerscore.val("playerscore + 1"));
      $(disk).addClass("player2Style");
      $(disk).css('background-color', diskColorP2);
    }

    var rowIndex = $(this).parent().parent().parent().children().index($(this).parent().parent());
    var colIndex = $(this).parent().parent().children().index($(this).parent());

    markFlippableDisks(rowIndex, colIndex);

    changeScore();
    flipAllDirections();

    changePlayer();
    toggleHoverableSquares();

    if ($(".isClickable").length === 0) {
      if (currentPlayer === 1) {
        currentPlayer = 2;
      } else {
        currentPlayer = 1;
      }
      toggleHoverableSquares();
    }
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
  $("#start-btn").text("Continue");
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
}

function updateDiskColorP2(diskColorValue) {
  diskColorP2 = diskColorP1 === diskColorValue ? "dark" + diskColorValue : diskColorValue;
}

function finishedForm() {
  // Setting defaults for testing
  setDefaults();

  dynamicTable(gridSize);
  colorAllCells(gridColor);
  hideModal();
  startResumeGame();
  setboard();
  showScoreTable();
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
  $(table.rows[i].cells[j].firstChild.firstChild).addClass("disk player1Style").css("backgroundColor", diskColorP1);
  $(table.rows[i].cells[j + 1].firstChild.firstChild).addClass("disk player1Style").css("backgroundColor", diskColorP2);
  $(table.rows[i + 1].cells[j + 1].firstChild.firstChild).addClass("disk player2Style").css("backgroundColor", diskColorP1);
  $(table.rows[i + 1].cells[j].firstChild.firstChild).addClass("disk player2Style").css("backgroundColor", diskColorP2);
  toggleHoverableSquares();
}

function hideScoreTable() {
  $("#score-board").addClass("d-none")
}

function showScoreTable() {
  $("#score-board").removeClass("d-none")
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
  $(".isClickable").removeClass("isClickable");

  for (let i = 1; i < table.rows.length - 1; i++) {
    for (let j = 1; j < table.rows[i].cells.length - 1; j++) {
      let cell = $(table.rows[i].cells[j]);

      if (isSquareClickable(i, j)) {
        $(cell).removeClass("notHoverable");
        $(cell).css("backgroundColor", getCurrentPlayerColor());
        $(cell).addClass("isClickable");

      } else {
        $(cell).addClass("notHoverable");
        $(cell).css("backgroundColor", "transparent");
      }
    }
  }
}

function isDirectionClickable(i, j, foundOP, op1, op2) {
  if ($(table.rows[i].cells[j]).hasClass('edge')) {
    return false;
  }
  else if (!hasDiskChild(i, j)) {
    return false;
  }
  else if (getCurrentPlayerColor() !== getDiskColor(i, j)) {
    return isDirectionClickable(i + (op1), j + (op2), true, op1, op2);
  }
  return foundOP;
}

function flipDirection(i, j, op1, op2) {
  if ($(table.rows[i].cells[j]).hasClass('edge')) {
    return;
  }
  else if (!hasDiskChild(i, j)) {
    return;
  }
  else if (getCurrentPlayerColor() !== getDiskColor(i, j)) {
    flipDisk(i, j);
    flipDirection(i + (op1), j + (op2), op1, op2);
  }

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
  cell.addClass("player" + currentPlayer + "Style");
  cell.css("backgroundColor", newColor);

  let currentPlayerScore = $("player" + currentPlayer + "score");

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

function shouldFlipDirection(i, j, className, op1, op2) {
  if ($(table.rows[i].cells[j]).hasClass('edge')) {
    return "";
  }
  else if (!hasDiskChild(i, j)) {
    return "";
  }
  else if (getCurrentPlayerColor() !== getDiskColor(i, j)) {
    var newClass = shouldFlipDirection(i + (op1), j + (op2), "shouldFlip", op1, op2);
    $(table.rows[i].cells[j]).addClass(newClass);
    return newClass;
  }
  else {
    return className;
  }
}

function markFlippableDisks(i, j) {
  shouldFlipDirection(i - 1, j, "", -1, 0);
  shouldFlipDirection(i - 1, j + 1, "", -1, 1);
  shouldFlipDirection(i, j + 1, "", 0, 1);
  shouldFlipDirection(i + 1, j + 1, "", 1, 1);
  shouldFlipDirection(i + 1, j, "", 1, 0);
  shouldFlipDirection(i + 1, j - 1, "", 1, -1);
  shouldFlipDirection(i, j - 1, "", 0, -1);
  shouldFlipDirection(i - 1, j - 1, "", -1, -1);
}

function flipAllDirections() {
  $(".shouldFlip .disk").css("backgroundColor", getCurrentPlayerColor());
  $(".shouldFlip").removeClass("shouldFlip");
}

function changeScore() {
  let p1ScoreHolder = $("#player1score")[0];
  let p2ScoreHolder = $("#player2score")[0];
  let p1Score = Number(p1ScoreHolder.innerHTML);
  let p2Score = Number(p2ScoreHolder.innerHTML);

  let scorechange = $(".shouldFlip").length;
  if (currentPlayer === 1) {
    p1ScoreHolder.innerHTML = p1Score + scorechange + 1;
    p2ScoreHolder.innerHTML = p2Score - scorechange;
  } else {
    p2ScoreHolder.innerHTML = p2Score + scorechange + 1;
    p1ScoreHolder.innerHTML = p1Score - scorechange;
  }

  let totalScore = Number(p1ScoreHolder.innerHTML) + Number(p2ScoreHolder.innerHTML);
  if (totalScore === Math.pow(gridSize, 2)) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(timer);
  $('#game-over-modal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static'
  });
  displayWinner();
}

function displayWinner() {
  p1Score = Number($("#player1score")[0].innerHTML);
  p2Score = Number($("#player2score")[0].innerHTML);
  p1TotalWinsHolder = $("#p1-total")[0];
  p2TotalWinsHolder = $("#p2-total")[0];
  p1TotalWins = Number(p1TotalWinsHolder.innerHTML);
  p2TotalWins = Number(p2TotalWinsHolder.innerHTML);

  if (p1Score > p2Score) {
    $(".winning-player")[0].innerHTML = "Player 1 wins!"
    p1TotalWinsHolder.innerHTML = p1TotalWins + 1;
  } else if (p1Score < p2Score) {
    $(".winning-player")[0].innerHTML = "Player 2 wins!" 
    p2TotalWinsHolder.innerHTML = p2TotalWins + 1;
  } else {
    $(".winning-player")[0].innerHTML = "It's a draw!"    
  }
}

function clickRandomSquare() {
  var randomNum = getRandomInt($(".isClickable").length);
  $($(".isClickable")[randomNum].firstChild).click();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}