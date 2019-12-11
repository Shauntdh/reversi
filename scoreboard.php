<?php include('server.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>REVERSI</title>
</head>
<body>
    <!-- navbar -->
    <nav class="p-5 sticky-top navbar navbar-expand-sm">
        <!-- navbar-brand -->
        <span id="logo-text"><img id="logo" src="assets/LogoMakr_6bnajQ.png" alt="logo" height="75" width="75"></span>
        <!-- /navbar-brand -->
        <a href="home.php" class="ml-auto"><button class="btn btn-transparent border rounded-pill p-3">Main Menu</button></a>
        <a href="main.php" class="ml-4"><button class="btn btn-transparent border rounded-pill p-3">Return to Game</button></a>
    </nav>
    <!-- /navbar -->
    
    <div class="row scoreboard m-5">
        <div class="container">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Player Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- insert HTML using PHP for the scoreboard -->

                        <?php



                        ?>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>




    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>