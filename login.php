<?php

$email = $_POST['email'];
$password = $_POST['password'];
    
$student_number = explode("@", $email);
if (count($student_number) !== 2) {
    header("Location: https://web-proje.pages.dev/login");
    exit();
}    
if ($password === $student_number[0]) {
    echo "Hoşgeldiniz " . $student_number[0];
} else {
    header("Location: https://web-proje.pages.dev/login");
    exit();
}
?>
