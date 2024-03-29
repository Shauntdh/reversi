<?php
session_start();

// initializing variables
$email      = "";
$firstname  = "";
$lastname   = "";
$age        = "";
$gender     = "";
$location   = "";
// $avatar     = "";
$score      = "";
$time       = "";

$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'reversi');


// REGISTER USER
if (isset($_POST['reg_user'])) {
  // receive all input values from the form
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password = mysqli_real_escape_string($db, $_POST['password']);
  $firstname = mysqli_real_escape_string($db, $_POST['firstname']);
  $lastname = mysqli_real_escape_string($db, $_POST['lastname']);
  $age = mysqli_real_escape_string($db, $_POST['age']);
  $gender = mysqli_real_escape_string($db, $_POST['gender']);
  $location = mysqli_real_escape_string($db, $_POST['location']);
  

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password)) { array_push($errors, "Password is required"); }
  if (empty($firstname)) { array_push($errors, "First name is required"); }
  if (empty($lastname)) { array_push($errors, "Last name is required"); }
  if (empty($age)) { array_push($errors, "Age is required"); }
  if (empty($gender)) { array_push($errors, "Gender is required"); }
  if (empty($location)) { array_push($errors, "Location is required"); }


  // first check the database to make sure 
  // a user does not already exist with the same email
  $user_check_query = "SELECT * FROM users WHERE email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['email'] === $email) {
      array_push($errors, "email already exists");
    }
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
  	$password = md5($password);//encrypt the password before saving in the database

  	$query = "INSERT INTO users (email, password, firstname, lastname, age, gender, location) 
  			  VALUES('$email', '$password', '$firstname', '$lastname', '$age', '$gender', '$location')";
  	mysqli_query($db, $query);
    $_SESSION['firstname'] = $firstname;
    $_SESSION['success'] = "You are now logged in";
    $_SESSION['isSuccess'] = true;
    $_SESSION['loggedIn'] = true;
  	// header('location: home_loggedin.php');
    header('location: home.php');
    exit();
  }
}


// LOGIN USER
if (isset($_POST['login_user'])) {
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $response = array();
  
    if (empty($email)) {
        array_push($errors, "Email is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }
  
    if (count($errors) == 0) {
        $password = md5($password);
        $query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
        $results = mysqli_query($db, $query);
        $row = $results->fetch_assoc();
        if (mysqli_num_rows($results) == 1) {
          $_SESSION['email'] = $email;
          $_SESSION['success'] = "You are now logged in";
          $_SESSION['isSuccess'] = true;
          $_SESSION['firstname'] = $row['firstname'];
          $_SESSION['loggedIn'] = true;
          header('location: home.php');
          exit();

        }else { // No records found
          $_SESSION['isSuccess'] = true;
          $_SESSION['message'] = 'Incorrect email or password';
          array_push($errors, "Wrong email/password combination");
          header('location: home.php');
          exit();
        }
    } 
    $_SESSION['isSuccess'] = false; // count($errors) != 0
  }

  if (isset($_POST['scoreboard'])) {
    
    $player1 = $firstname . $lastname;
    $player2 = 'Player 2';
    $score1 = mysqli_real_escape_string($db, $_POST['player1score']);
    $score2 = mysqli_real_escape_string($db, $_POST['player2score']);
    $duration = mysqli_real_escape_string($db, $_POST['clock']);
  }
?>