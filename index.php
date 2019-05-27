<?
include 'setting.php';
echo($_SERVER['REQUEST_URI']);

$CONNECT = mysqli_connect(HOST, USER, PASS, DB);
//$Row = mysqli_fetch_assoc(mysqli_query($CONNECT, "SELECT * FROM `users` WHERE `id`<10"));
//echo (string)$Row;

include 'public/main.php';


?>
