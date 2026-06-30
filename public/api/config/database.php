<?php
// Reusable PDO Database Connection Configuration
// Compatible with Hostinger MySQL environment variables and local .env files

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Loads .env file content into environment variables if available
 */
function loadPhpEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || strpos($line, '#') === 0) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);
            // Strip wrapping quotes
            if (preg_match('/^"(.*)"$/', $value, $matches) || preg_match("/^'(.*)'$/", $value, $matches)) {
                $value = $matches[1];
            }
            if (!getenv($name)) {
                putenv("$name=$value");
                $_ENV[$name] = $value;
            }
        }
    }
    return true;
}

// Search for .env in potential directories (local root or parent directories)
loadPhpEnv(__DIR__ . '/../.env');
loadPhpEnv(__DIR__ . '/../../.env');
loadPhpEnv(__DIR__ . '/../../../.env');
if (isset($_SERVER['DOCUMENT_ROOT'])) {
    loadPhpEnv($_SERVER['DOCUMENT_ROOT'] . '/.env');
}

// Retrieve DB variables from environment or fallback to user's Hostinger credentials
$host = getenv('DB_HOST') ?: 'localhost';
$port = getenv('DB_PORT') ?: '3306';
$db   = getenv('DB_NAME') ?: 'u986363796_proch';
$user = getenv('DB_USER') ?: 'u986363796_salmanuel';
$pass = getenv('DB_PASSWORD') ?: 'SalmanUel1Proch';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Log server-side database error
    error_log("Hostinger Database Connection Failure: " . $e->getMessage());
    
    // Graceful error response that does not leak private database credentials
    http_response_code(500);
    echo json_encode([
        "error" => "MySQL Database Connection Failed. Please verify your Hostinger DB_HOST, DB_NAME, DB_USER, and DB_PASSWORD variables.",
        "details" => "Connection refused or server unreachable."
    ]);
    exit();
}
