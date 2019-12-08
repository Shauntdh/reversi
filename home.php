<?php 
  session_start();

//   if (isset($_GET['logout'])) {
//   	session_destroy();
//   	unset($_SESSION['email']);
//   	header("location: home.php");
//   }
    if (!isset($_SESSION['loggedIn'])) {
        $_SESSION['loggedIn'] = false;
    }
 ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="home.css">
    <script src="home.js"></script>

    <title>REVERSI</title>
</head>

<body>
    <nav class="top-nav navbar navbar-expand-lg bg-transparent">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-container collapse navbar-collapse" id="navbarNav">
            <div class="mr-auto"></div>
            <ul class="nav-list navbar-nav">
            <?php if ($_SESSION["loggedIn"]) { ?>
                <li class="m-1 pr-4">
                    <span id="welcome_text">Hello <?php echo $_SESSION['firstname'] ?>!</span>
                </li>
                <li>
                    <a href="logout.php">
                        <button type="button" class="login-btn btn btn-transparent border rounded-pill mr-2">Log Out</button>
                    </a>
                </li>
            <?php } else { ?>
                <li><button type="button" class="sign-up-btn btn btn-transparent border rounded-pill mr-2"
                        data-toggle="modal" data-target="login-modal" onclick="loadModalSignUp()">Sign Up</button></li>
                <li><button type="button" class="login-btn btn btn-transparent border rounded-pill mr-2"
                        data-toggle="modal" data-target="login-modal" onclick="loadModalLogin()">Login</button></li>
            <?php } ?>
            </ul>
        </div>
    </nav>

    <?php include 'login.php';?>
    <?php include 'register.php';?>

    <div class="row mt-5 title">
        <div class="col-6 my-5 title-img">
            <span class="t-image float-right"><img class="logo-img" src="assets/LogoMakr_6bnajQ.png" alt=""></span>
        </div>
        <div class="col-6 my-auto title-text">
            <h1 class="title-text float-left">Reversi.</h1>
        </div>
    </div>
    <div class="button-container">
        <div class="row title-btns">
            <div class="col-6">
                <a href="main.php" class="float-right">
                    <button <?php if(!$_SESSION['loggedIn']) { echo 'disabled'; }?> class="btn-play btn btn-transparent rounded-pill">Play Game</button>
                </a>            
            </div>
            <div class="col-6 my-auto">
                <a href="about.html"><button class="btn-about-game btn btn-transparent rounded-pill">About
                        Game</button></a>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <!-- custome JavaScript for home -->
</body>

</html>