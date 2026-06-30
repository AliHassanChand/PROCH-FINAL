<?php
// Production-ready API Endpoint for General Family Inquiries
// Path: /api/general_family_inquiries.php

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

$name     = isset($input['name']) ? trim($input['name']) : '';
$email    = isset($input['email']) ? trim($input['email']) : '';
$phone    = isset($input['phone']) ? trim($input['phone']) : '';
$relation = isset($input['relation']) ? trim($input['relation']) : 'Family Member / Guardian';
$message  = isset($input['message']) ? trim($input['message']) : '';
$status   = isset($input['status']) ? trim($input['status']) : 'Pending';

// Validation of required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Your Name, Email, and Consultation Message are required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Please provide a valid email address."]);
    exit();
}

// Sanitize inputs
$name     = htmlspecialchars(strip_tags($name));
$email    = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone    = htmlspecialchars(strip_tags($phone));
$relation = htmlspecialchars(strip_tags($relation));
$message  = htmlspecialchars(strip_tags($message));
$status   = htmlspecialchars(strip_tags($status));

// Gather system info for security audits
$ip_address = $_SERVER['REMOTE_ADDR'] ?: 'Unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?: 'Unknown';

try {
    // Check if table exists, create it on-the-fly to ensure seamless first-time migrations
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS general_family_inquiries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) DEFAULT NULL,
            relation VARCHAR(255) DEFAULT 'Family Member / Guardian',
            message TEXT NOT NULL,
            status VARCHAR(50) DEFAULT 'Pending',
            ip_address VARCHAR(100) DEFAULT NULL,
            user_agent VARCHAR(500) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTableSQL);

    // Prepare secure query to prevent SQL injections
    $sql = "INSERT INTO general_family_inquiries (
                name, email, phone, relation, message, status, ip_address, user_agent
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $name,
        $email,
        $phone ?: null,
        $relation ?: 'Family Member / Guardian',
        $message,
        $status,
        $ip_address,
        $user_agent
    ]);

    $lastId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "id" => (int)$lastId,
        "message" => "General family inquiry submitted and stored successfully into Hostinger MySQL database."
    ]);

} catch (\PDOException $e) {
    error_log("Family message submission MySQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "error" => "Hostinger MySQL Database Error: Failed to record general family inquiry.",
        "details" => $e->getMessage()
    ]);
}
