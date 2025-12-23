
<?php
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = trim($_POST['name'] ?? '');
    $birth_date = $_POST['birth_date'] ;
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $gender = $_POST['gender'];

    $errors = [];

    if ($name === '') {
        $errors[] = "Name is required.";
    } 
    
    if ($birth_date=== '' || !strtotime($birth_date) ) {
        $errors[] = "birth-date is required.";}

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }
    
     if ($password === '') {
        $errors[] = "Password is required.";
    }
    if ($gender === ''){
        $errors[]="Gender is required";
    }

    if (!empty($errors)) {
        foreach ($errors as $err) {
            echo "<p>$err</p>";
        }
        echo '<p><a href="register.html">Go back</a></p>';
        exit; //  STOP execution
    }


            // Check BEFORE inserting
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $checkStmt->execute([$email]);

        if ($checkStmt->fetch()) {
            // Show friendly error, don't crash
}

    try {
        $stmt = $pdo->prepare(
            "INSERT INTO users (name, password,email, gender ,birth_date)
             VALUES (:name, :password ,:email,:gender,:birth_date)"
        );

        $stmt->execute([
            ':name' => $name,
            ':password' => password_hash($password, PASSWORD_DEFAULT),
            ':email' => $email,
            ':gender'=> $gender,
            ':birth_date'=>$birth_date
        ]);

        echo "<p>Registration successful!</p>";

    } catch (PDOException $e) {
        echo "<p>Error: " . $e->getMessage() . "</p>";
    }
}

// Auto-redirect after 3 seconds
echo "<meta http-equiv='refresh' content='3;url=login.html'>";

?>










