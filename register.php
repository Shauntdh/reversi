<?php include('server.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="home.css">

    <title>REVERSI</title>
</head>

<body>

    <!-- Sign-up Modal -->
    <div class="sign-up-modal modal fade" id="sign-up-modal" tabindex="-1" role="dialog"
        aria-labelledby="singUpModalLabel" aria-hidden="true">
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

                            <form method="post" action="register.php" class="mx-auto mb-5">
                                <?php include('errors.php'); ?>
                                <div class="email-form input-group mb-3">
                                    <input type="email" name="email" value="<?php echo $email; ?>" class="form-control rounded-pill" id="sign-up-email"
                                        aria-describedby="emailHelp" placeholder="Email">
                                </div>
                                <div class="password-form input-group mb-3">
                                    <input type="password" name="password" class="form-control rounded-pill" id="sign-up-password"
                                        placeholder="Password">
                                </div>
                                <div class="form-row">
                                    <div class="col input-group">
                                        <input type="text" name="firstname" value="<?php echo $firstname; ?>" class="form-control rounded-pill" placeholder="First name">
                                    </div>
                                    <div class="col input-group">
                                        <input type="text" name="lastname" value="<?php echo $lastname; ?>" class="form-control rounded-pill" placeholder="Last name">
                                    </div>
                                </div>
                                <div class="form-row mt-3">
                                    <div class="col input-group">
                                        <input type="text" name="age" value="<?php echo $age; ?>" class="form-control rounded-pill" placeholder="Age">
                                    </div>
                                    <div class="col">
                                        <div class="form-check form-check-inline ml-4 mt-1">
                                            <input class="form-check-input" type="radio" name="male-radio"
                                                id="male-radio" value="option1">
                                            <label class="form-check-label" for="male-radio">
                                                Male
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="female-radio"
                                                id="female-radio" value="option2">
                                            <label class="form-check-label" for="female-radio">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="row mb-3 modal-btn">
                                <div class="col-6">
                                    <button type="button" class="btn btn-secondary rounded-pill float-right pl-4 pr-4"
                                    data-dismiss="modal">Close</button>
                                </div>
                                <div class="col-6" class input-group>
                                    <button type="submit" name="reg_user" class="btn btn-primary rounded-pill pl-4 pr-4">Register</button>
                                </div>
                            </div>
                        </form>

                    <!-- form end -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sign-up Modal -->




    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <!-- custome JavaScript for home -->
    <script src="home.js"></script>
</body>

</html>