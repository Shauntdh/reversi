
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

                        <form method="post" action="server.php" class="mx-auto mb-5" enctype="multipart/form-data">
                            <div class="email-form input-group mb-3">
                                <input type="email" name="email" class="form-control rounded-pill" id="sign-up-email"
                                    aria-describedby="emailHelp" placeholder="Email">
                            </div>
                            <div class="password-form input-group mb-3">
                                <input type="password" name="password" class="form-control rounded-pill" id="sign-up-password"
                                    placeholder="Password">
                            </div>
                            <div class="form-row">
                                <div class="col input-group">
                                    <input type="text" name="firstname" class="form-control rounded-pill" placeholder="First name">
                                </div>
                                <div class="col input-group">
                                    <input type="text" name="lastname" class="form-control rounded-pill" placeholder="Last name">
                                </div>
                            </div>
                            <div class="form-row mt-3">
                                <div class="col input-group">
                                    <input type="text" name="age"  class="form-control rounded-pill" placeholder="Age">
                                </div>
                                <div class="col">
                                    <div class="form-check form-check-inline ml-4 mt-1">
                                        <input class="form-check-input" type="radio" name="gender"
                                            id="male-radio" value="M">
                                        <label class="form-check-label" for="male-radio">
                                            Male
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="gender"
                                            id="female-radio" value="F">
                                        <label class="form-check-label" for="female-radio">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row mt-3">
                                <div class="col input-group">
                                    <input type="text" name="location" class="form-control rounded-pill" placeholder="Location">
                                </div>
                            </div>
                            <div class="form-row mt-3">
                                <div class="col input-group">
                                    <input type="file" name="avatar" id="avatar">
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
