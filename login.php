
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
                        <div class="col">
                        <!-- form start -->
                            <form id="submitForm" class="mx-auto mb-5" method="post" action="server.php">
                                <!-- <div id="errorMessages" class="d-none">ERROR</div> -->
                                <div class="mb-4 email-form input-group pr-5 pl-5 pt-4">
                                    <input type="email" name="email" required class="form-control rounded-pill" id="login-email"
                                    aria-describedby="emailHelp" placeholder="Email">
                                </div>
                                <div class="mb-4 password-form input-group pr-5 pl-5 pt-2">
                                    <input type="password" name="password" class="form-control rounded-pill" id="login-password"
                                    placeholder="Password">
                                </div>
                                <div class="container-fluid">
                                    <div class="row modal-btn pl-5 pr-5 pt-5">
                                        <div class="col-6 input-group flex-column">
                                            <button type="button" id="cancel-btn" class="btn btn-secondary rounded-pill float-right "
                                            data-dismiss="modal">Close</button>
                                        </div>
                                        <div class="col-6 input-group flex-column">
                                            <input id="li-btn" type="submit" name="login_user" class="btn btn-primary rounded-pill" value="Login" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        <!-- form end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Login Modal --> 