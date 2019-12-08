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
    
    <!-- Login Modal -->
    <div class="login-modal modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row logo-area">
                        <span class="mx-auto mt-5 mb-5"><img class="logo-img" src="assets/LogoMakr_6bnajQ.png"
                        alt="logo"></span>
                    </div>
                    <div class="row form-area">
                        <!-- form start -->
                        
                        <div class="col">
                            <form id="submitForm" class="mx-auto mb-5" method="post" action="server.php">
                                <?php include('errors.php'); ?>
                                <div id="errorMessages" class="d-none">ERROR</div>
                                <div class="mb-4 email-form input-group">
                                    <input type="email" name="email" required class="form-control rounded-pill" id="login-email"
                                    aria-describedby="emailHelp" placeholder="Email">
                                </div>
                                <div class="mb-4 password-form input-group">
                                    <input type="password" name="password" class="form-control rounded-pill" id="login-password"
                                    placeholder="Password">
                                </div>
                                <div class="row modal-btn">
                                    <div class="col-6 input-group flex-column">
                                        <button type="button" class="btn btn-secondary rounded-pill float-right "
                                        data-dismiss="modal">Close</button>
                                    </div>
                                    <div class="col-6 input-group flex-column">
                                        <input id="" type="submit" name="login_user" class="btn btn-primary rounded-pill" value="Login" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <!-- form end -->
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Login Modal --> 


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

<!-- jQuery library -->
<link rel="stylesheet" type="text/css" href="home.css">

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <!-- custome JavaScript for home -->
<!-- </body>

</html>