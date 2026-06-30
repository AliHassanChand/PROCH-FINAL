<?php
// Production-ready API Endpoint for Feedbacks
// Path: /api/feedbacks.php

require_once __DIR__ . '/config/database.php';

// Only permit POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed. Only POST requests are permitted."]);
    exit();
}

// Get JSON raw body input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Bad Request. Missing or invalid JSON payload."]);
    exit();
}

$name         = isset($input['name']) ? trim($input['name']) : '';
$relationship = isset($input['relationship']) ? trim($input['relationship']) : 'Family Member / Circle of Care';
$rating       = isset($input['rating']) ? (int)$input['rating'] : 5;
$message      = isset($input['message']) ? trim($input['message']) : '';

// Validation of required fields
if (empty($name) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Name and feedback narrative are required fields."]);
    exit();
}

// Sanitize inputs
$name         = htmlspecialchars(strip_tags($name));
$relationship = htmlspecialchars(strip_tags($relationship));
$message      = htmlspecialchars(strip_tags($message));

try {
    // Check if table exists, create it on-the-fly to ensure seamless first-time migrations
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS feedbacks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            relationship VARCHAR(255) NOT NULL,
            rating INT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTableSQL);

    // Prepare secure query to prevent SQL injections
    $sql = "INSERT INTO feedbacks (
                name, relationship, rating, message
            ) VALUES (?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $name,
        $relationship ?: 'Family Member / Circle of Care',
        $rating,
        $message
    ]);

    $lastId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "id" => (int)$lastId,
        "message" => "Feedback submitted successfully into Hostinger MySQL database."
    ]);

} catch (\PDOException $e) {
    error_log("Feedback submission MySQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "error" => "Hostinger MySQL Database Error: Failed to record feedback.",
        "details" => $e->getMessage()
    ]);
}
