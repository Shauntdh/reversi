<?php include('server.php'); ?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="main.css">
    <link rel="stylesheet" type="text/css" href="modal.css">

    <title>REVERSI</title>
</head>

<body>

    <!-- Navbar -->
    <nav class="main-navbar navbar navbar-expand-sm">
        <!-- Navbar-brand -->
        <span id="logo-text"><img id="logo" src="assets/LogoMakr_6bnajQ.png" alt="logo" height="75" width="75"></span>
        <!-- /navbar end -->

        <!-- buttons -->
        <button type="button" class="start-btn btn btn-transparent border rounded-pill ml-4" onclick="startTimer()"
            id="start-btn">Pause Game</button>
        <button type="button" class="reset-btn btn btn-transparent border rounded-pill ml-4" onclick="restartGame()"
            id="reset-btn">Restart
            Game</button>
        <a href="home.php"><button class="btn-main-menu btn btn-transparent border rounded-pill ml-4">Main Menu
            </button></a>
        <!-- /buttons -->

        <!-- timer -->
        <ul class="nav navbar-nav ml-auto">
            <li><span id="clock" name="clock" class="mr-1">00:00</span></li>
        </ul>

        <!-- /timer -->
    </nav>
    <!-- /navbar end -->

    <div class="row mt-5 mx-0">
        <div class="col-12 col-md-6">
            <!-- grid container -->
            <table id="my-table" class="shadow-lg mx-auto">

            </table>
            <!-- /grid container -->
        </div>
        <div class="col-12 col-md-4">
            <!-- UI -->
            <table class="table mx-auto mt-5 mt-md-0 d-none" id="score-board">
                <thead>
                    <tr>
                        <?php if (isset($_SESSION['firstname'])) : ?>
                            <th id="player1Name" class="playerNames" scope="col"><?php echo $_SESSION['firstname']; ?></th>
                        <?php endif ?>
                        <th id="player2Name" class="playerNames" scope="col">Player 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="player1score" name="player1score" class="edge">2</td>
                        <td id="player2score" name="player2score" class="edge">2</td>
                    </tr>
                </tbody>
            </table>
            <!-- /UI -->
        </div>
    </div>



    <!-- modal -->
    <div class="modal fade" id="start-game-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form id="regForm" action="">
                        <!-- One "tab" for each step in the form: -->
                        <div class="tab">
                            <div class="form-group">
                                <label for="game-mode-menu">Game Mode:</label>
                                <select class="form-control m-0" id="game-mode-menu"
                                    onchange="updateGameMode(this.value)">
                                    <option>-- Select --</option>
                                    <!-- Remove this -->
                                    <option selected>Player vs. Player</option>
                                    <option disabled>Player vs. Computer</option>
                                </select>
                            </div>
                        </div>

                        <div class="tab">
                            <div class="form-group">
                                <label for="grid-size-menu">Grid Size:</label>
                                <select class="form-control m-0" id="grid-size-menu"
                                    onchange="updateGridSize(this.value)">
                                    <option>-- Select --</option>
                                    <option id="fourbyfour">4X4</option>
                                    <!-- Remove later -->
                                    <option id="sixbysix" selected>6X6</option>
                                    <option id="eightbyeight">8X8</option>
                                </select>
                            </div>
                        </div>

                        <div class="tab">
                            <div class="form-group">
                                <label for="grid-color-menu">Grid Color:</label>
                                <select class="form-control m-0" id="grid-color-menu"
                                    onchange="updateGridColor(this.value)">
                                    <option>-- Select --</option>
                                    <!-- Remove later -->
                                    <option selected>White</option>
                                    <option>Black</option>
                                    <option>Gray</option>
                                </select>
                            </div>
                        </div>

                        <div class="tab">
                            <div class="form-group">
                                <label for="disk-color-menu1">Player 1 Disk Color:</label>
                                <select class="form-control m-0" id="disk-color-menu1"
                                    onchange="updateDiskColorP1(this.value.toLowerCase())">
                                    <option>-- Select --</option>
                                    <!-- Remove selected -->
                                    <option selected>Red</option>
                                    <option>Blue</option>
                                    <option>Purple</option>
                                    <option>Green</option>
                                    <option>Orange</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="disk-color-menu2">Player 2 Disk Color:</label>
                                <select class="form-control m-0" id="disk-color-menu2"
                                    onchange="updateDiskColorP2(this.value.toLowerCase())">
                                    <option>-- Select --</option>
                                    <option>Red</option>
                                    <option>Blue</option>
                                    <option>Purple</option>
                                    <!-- Remove selected -->
                                    <option selected>Green</option>
                                    <option>Orange</option>
                                </select>
                            </div>
                        </div>

                        <div style="overflow:auto;">
                            <div style="float:right;">
                                <button type="button" id="prevBtn" class="btn btn-secondary rounded-pill mr-2"
                                    onclick="nextPrev(-1)">Previous</button>
                                <button type="button" id="nextBtn" class="btn btn-primary rounded-pill"
                                    onclick="nextPrev(1)">Next</button>
                            </div>
                        </div>

                        <!-- Circles which indicates the steps of the form: -->
                        <div style="text-align:center;margin-top:40px;">
                            <span class="step"></span>
                            <span class="step"></span>
                            <span class="step"></span>
                            <span class="step"></span>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /modal -->
    <!-- end game modal -->

    <div class="modal fade" id="game-over-modal" tabindex="-1" role="dialog" aria-labelledby="gameOverLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <h1 class="winning-player mx-auto m-5">player</h1>
                    </div>
                    <div class="row mb-3 mt-4">
                        <div class="col">
                            <a href="scoreboard.php" class="float-right"><button type="submit" name="scoreboard" class="btn btn-transparent border rounded-pill p-3">Scoreboard</button></a>
                        </div>
                        <div class="col">
                            <button type="button" class="reset-btn btn btn-transparent border rounded-pill p-3" onclick="restartGame()" id="reset-btn">Restart Game</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- /end game modal -->




    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
    <script src="modal.js"></script>


</body>

</html>