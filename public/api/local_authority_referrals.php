<?php
// Production-ready API Endpoint for Local Authority Referrals
// Path: /api/local_authority_referrals.php

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

// Map frontend camelCase parameters to snake_case if necessary
$commissioner_name = isset($input['commissionerName']) ? trim($input['commissionerName']) : (isset($input['commissioner_name']) ? trim($input['commissioner_name']) : '');
$authority         = isset($input['authority']) ? trim($input['authority']) : '';
$email             = isset($input['email']) ? trim($input['email']) : '';
$phone             = isset($input['phone']) ? trim($input['phone']) : '';
$service_user_name = isset($input['serviceUserName']) ? trim($input['serviceUserName']) : (isset($input['service_user_name']) ? trim($input['service_user_name']) : '');
$dob               = isset($input['dob']) ? trim($input['dob']) : '';
$diagnosis         = isset($input['diagnosis']) ? trim($input['diagnosis']) : 'Learning Disabilities & Autism Mix';
$required_ratios   = isset($input['requiredRatios']) ? trim($input['requiredRatios']) : (isset($input['required_ratios']) ? trim($input['required_ratios']) : '1:1 Support Day & night');
$funding_status    = isset($input['fundingStatus']) ? trim($input['fundingStatus']) : (isset($input['funding_status']) ? trim($input['funding_status']) : 'Secured');
$authority_type    = isset($input['authorityType']) ? trim($input['authorityType']) : (isset($input['authority_type']) ? trim($input['authority_type']) : 'CCG (NHS Commissioning)');
$risk_details      = isset($input['riskDetails']) ? trim($input['riskDetails']) : (isset($input['risk_details']) ? trim($input['risk_details']) : '');
$status            = isset($input['status']) ? trim($input['status']) : 'Pending';

// Validation of required fields
if (empty($commissioner_name) || empty($email) || empty($service_user_name)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Your Name, Email, and Service User Name are required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Validation Error: Please provide a valid email address."]);
    exit();
}

// Sanitize inputs
$commissioner_name = htmlspecialchars(strip_tags($commissioner_name));
$authority         = htmlspecialchars(strip_tags($authority));
$email             = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone             = htmlspecialchars(strip_tags($phone));
$service_user_name = htmlspecialchars(strip_tags($service_user_name));
$dob               = htmlspecialchars(strip_tags($dob));
$diagnosis         = htmlspecialchars(strip_tags($diagnosis));
$required_ratios   = htmlspecialchars(strip_tags($required_ratios));
$funding_status    = htmlspecialchars(strip_tags($funding_status));
$authority_type    = htmlspecialchars(strip_tags($authority_type));
$risk_details      = htmlspecialchars(strip_tags($risk_details));
$status            = htmlspecialchars(strip_tags($status));

// Gather system info for security audits
$ip_address = $_SERVER['REMOTE_ADDR'] ?: 'Unknown';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?: 'Unknown';

try {
    // Check if table exists, create it on-the-fly to ensure seamless first-time migrations
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS local_authority_referrals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            commissioner_name VARCHAR(255) NOT NULL,
            authority VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) DEFAULT NULL,
            service_user_name VARCHAR(255) NOT NULL,
            dob VARCHAR(50) DEFAULT NULL,
            diagnosis VARCHAR(255) DEFAULT 'Learning Disabilities & Autism Mix',
            required_ratios VARCHAR(255) DEFAULT '1:1 Support Day & night',
            funding_status VARCHAR(100) DEFAULT 'Secured',
            authority_type VARCHAR(255) DEFAULT 'CCG (NHS Commissioning)',
            risk_details TEXT DEFAULT NULL,
            status VARCHAR(50) DEFAULT 'Pending',
            ip_address VARCHAR(100) DEFAULT NULL,
            user_agent VARCHAR(500) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTableSQL);

    // Prepare secure query to prevent SQL injections
    $sql = "INSERT INTO local_authority_referrals (
                commissioner_name, authority, email, phone, service_user_name, 
                dob, diagnosis, required_ratios, funding_status, 
                authority_type, risk_details, status, ip_address, user_agent
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $commissioner_name,
        $authority ?: null,
        $email,
        $phone ?: null,
        $service_user_name,
        $dob ?: null,
        $diagnosis ?: null,
        $required_ratios ?: null,
        $funding_status ?: null,
        $authority_type ?: null,
        $risk_details ?: null,
        $status,
        $ip_address,
        $user_agent
    ]);

    $lastId = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "id" => (int)$lastId,
        "message" => "Referral submitted and stored successfully into Hostinger MySQL database."
    ]);

} catch (\PDOException $e) {
    error_log("Referral submission MySQL Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "error" => "Hostinger MySQL Database Error: Failed to record local authority referral.",
        "details" => $e->getMessage()
    ]);
}
