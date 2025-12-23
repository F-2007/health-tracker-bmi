
<?php
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
  
    $errors = [];
    

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }
    }
     if ($password === '') {
        $errors[] = "password is required.";
    }
   

    if (!empty($errors)) {
        foreach ($errors as $err) {
            echo "<p>$err</p>";
        }
        echo '<p><a href="login.html">Go back</a></p>';
        exit; //  STOP execution
    }

    try {
         // Fixed SQL query - get password for the provided email
        $stmt = $pdo->prepare("SELECT password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            echo "<p>Login successful!</p>";
            // TODO: Set session and redirect to dashboard
        } else {
            echo "<p>Invalid email or password.</p>";
        }

    } catch (PDOException $e) {
        echo "<p>Error: " . $e->getMessage() . "</p>";
    }

?>