<?php
session_start();
require_once '../database/connection.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
     http_response_code(400);
     echo json_encode(['success' => false, 'message' => 'Invalid data']);
     exit();
}

$user_id = $_SESSION['user_id'];
$weight = $data['weight'];
$height = $data['height'];
$bmi = $data['bmi'];
$status = $data['status'];
$date = date('Y-m-d');

try {
    $stmt = $pdo->prepare("INSERT INTO health_stats (user_id, weight_in_kg, height_in_cm, bmi_value, bmi_status, date_recorded) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$user_id, $weight, $height, $bmi, $status, $date]);
    
    echo json_encode(['success' => true, 'message' => 'BMI saved successfully']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
