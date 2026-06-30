<?php
// Production-ready API Endpoint for Careers (Job Applications)
// Path: /api/applications.php

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

$name       = isset($input['name']) ? trim($input['name']) : '';
$email      = isset($input['email']) ? trim($input['email']) : '';
$phone      = isset($input['phone']) ? trim($input['phone']) : '';
$role       = isset($input['role']) ? trim($input['role']) : '';
$experience = isset($input['experience']) ? trim($input['experience']) : '';
$statement  = isset($input['statement']) ? trim($input['statement']) : '';

// Validation of required fields
if (empty($name) || empty($email) || empty($role) || empty($statement)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Name, Email, Role, and Statement of Values are required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Please provide a valid email address."]);
    exit();
}

// Sanitize inputs
$name       = htmlspecialchars(strip_tags($name));
$email      = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone      = htmlspecialchars(strip_tags($phone));
$role       = htmlspecialchars(strip_tags($role));
$experience = htmlspecialchars(strip_tags($experience));
$statement  = htmlspecialchars(strip_tags($statement));

try {
    // Check if table exists, create it on-the-fly to ensure seamless first-time migrations
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) DEFAULT NULL,
            role VARCHAR(255) NOT NULL,
            experience TEXT DEFAULT NULL,
            statement TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTableSQL);

    // Prepare secure query to prevent SQL injections
    $sql = "INSERT INTO applications (
                name, email, phone, role, experience, statement
            ) VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $name,
        $email,
        $phone ?: null,
        $role,
        $experience ?: null,
        $statement
    ]);

    $lastId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "id" => (int)$lastId,
        "message" => "Career expression of interest recorded successfully into Hostinger MySQL database."
    ]);

} catch (\PDOException $e) {
    error_log("Careers application MySQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "error" => "Hostinger MySQL Database Error: Failed to record career expression of interest.",
        "details" => $e->getMessage()
    ]);
}
