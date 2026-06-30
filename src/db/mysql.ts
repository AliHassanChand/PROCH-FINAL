import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: mysql.Pool | null = null;
let isInitialized = false;

// Configuration values from environment variables
const dbConfig = {
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000, // 5 seconds timeout
};

/**
 * Validates if the configuration environment variables are set.
 */
export function isConfigured(): boolean {
  return !!(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);
}

/**
 * Safe, lazy getter for the MySQL connection pool.
 */
export async function getMySQLPool(): Promise<mysql.Pool> {
  if (pool) {
    return pool;
  }

  if (!isConfigured()) {
    throw new Error(
      "MySQL Connection Error: Database configuration environment variables are missing (DB_HOST, DB_NAME, DB_USER)."
    );
  }

  try {
    pool = mysql.createPool(dbConfig);
    
    // Test the pool by getting a connection
    const connection = await pool.getConnection();
    connection.release();
    
    // Auto-create tables if they don't exist
    if (!isInitialized) {
      await initializeTables(pool);
      isInitialized = true;
    }

    return pool;
  } catch (err: any) {
    pool = null; // Reset pool on failure so next attempt retries connection
    throw new Error(`MySQL Database Connection Failed: ${err.message}`);
  }
}

/**
 * Automatic table structure initialization (schema setup).
 */
async function initializeTables(db: mysql.Pool) {
  console.log("Initializing Hostinger MySQL tables...");

  const createLocalAuthorityReferralsTable = `
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
  `;

  const createGeneralFamilyInquiriesTable = `
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
  `;

  const createFamilyMessagesTable = `
    CREATE TABLE IF NOT EXISTS family_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      relation VARCHAR(255) DEFAULT 'Family Member / Guardian',
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createReferralsTable = `
    CREATE TABLE IF NOT EXISTS referrals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      commissioner_name VARCHAR(255) NOT NULL,
      authority VARCHAR(255) DEFAULT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      service_user_name VARCHAR(255) NOT NULL,
      dob VARCHAR(50) DEFAULT NULL,
      diagnosis VARCHAR(255) DEFAULT 'Learning Disabilities & Autism Mix',
      funding_status VARCHAR(100) DEFAULT 'Secured',
      risk_details TEXT DEFAULT NULL,
      required_ratios VARCHAR(255) DEFAULT '1:1 Support Day & night',
      authority_type VARCHAR(255) DEFAULT 'CCG (NHS Commissioning)',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createFeedbacksTable = `
    CREATE TABLE IF NOT EXISTS feedbacks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      relationship VARCHAR(255) NOT NULL,
      rating INT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createApplicationsTable = `
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
  `;

  // Run initializations inside transactions or sequence to ensure correctness
  await db.query(createLocalAuthorityReferralsTable);
  await db.query(createGeneralFamilyInquiriesTable);
  await db.query(createFamilyMessagesTable);
  await db.query(createReferralsTable);
  await db.query(createFeedbacksTable);
  await db.query(createApplicationsTable);
  console.log("Hostinger MySQL tables initialized successfully.");
}

// ==========================================
// IN-MEMORY COMPATIBILITY DATABASE ENGINE
// ==========================================
interface MemoryFamilyMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  relation: string;
  message: string;
  created_at: string;
}

interface MemoryReferral {
  id: number;
  commissioner_name: string;
  authority: string | null;
  email: string;
  phone: string | null;
  service_user_name: string;
  dob: string | null;
  diagnosis: string;
  funding_status: string;
  risk_details: string | null;
  required_ratios: string;
  authority_type: string;
  created_at: string;
}

interface MemoryFeedback {
  id: number;
  name: string;
  relationship: string;
  rating: number;
  message: string;
  created_at: string;
}

interface MemoryApplication {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  experience: string | null;
  statement: string;
  created_at: string;
}

const memoryDb = {
  local_authority_referrals: [] as any[],
  general_family_inquiries: [] as any[],
  family_messages: [] as MemoryFamilyMessage[],
  referrals: [] as MemoryReferral[],
  feedbacks: [] as MemoryFeedback[],
  applications: [] as MemoryApplication[],
};

function executeMemoryQuery(sql: string, params: any[]): any {
  const cleanSql = sql.trim().replace(/\s+/g, " ");

  // 9. INSERT INTO local_authority_referrals
  if (/^INSERT INTO local_authority_referrals/i.test(cleanSql)) {
    const [
      commissioner_name, authority, email, phone, service_user_name,
      dob, diagnosis, required_ratios, funding_status,
      authority_type, risk_details, status, ip_address, user_agent
    ] = params;
    const newId = memoryDb.local_authority_referrals.length + 1;
    memoryDb.local_authority_referrals.push({
      id: newId, commissioner_name, authority, email, phone, service_user_name,
      dob, diagnosis, required_ratios, funding_status,
      authority_type, risk_details, status, ip_address, user_agent,
      created_at: new Date().toISOString()
    });
    return { insertId: newId };
  }

  // 10. INSERT INTO general_family_inquiries
  if (/^INSERT INTO general_family_inquiries/i.test(cleanSql)) {
    const [name, email, phone, relation, message, status, ip_address, user_agent] = params;
    const newId = memoryDb.general_family_inquiries.length + 1;
    memoryDb.general_family_inquiries.push({
      id: newId, name, email, phone, relation, message, status, ip_address, user_agent,
      created_at: new Date().toISOString()
    });
    return { insertId: newId };
  }
  
  // 5. INSERT INTO family_messages
  if (/^INSERT INTO family_messages/i.test(cleanSql)) {
    const [name, email, phone, relation, message] = params;
    const newId = memoryDb.family_messages.length > 0 ? Math.max(...memoryDb.family_messages.map(m => m.id)) + 1 : 1;
    const item: MemoryFamilyMessage = {
      id: newId,
      name,
      email,
      phone: phone || null,
      relation: relation || "Family Member / Guardian",
      message,
      created_at: new Date().toISOString()
    };
    memoryDb.family_messages.push(item);
    return { insertId: newId };
  }
  
  // 6. INSERT INTO referrals
  if (/^INSERT INTO referrals/i.test(cleanSql)) {
    const [
      commissioner_name,
      authority,
      email,
      phone,
      service_user_name,
      dob,
      diagnosis,
      funding_status,
      risk_details,
      required_ratios,
      authority_type
    ] = params;
    const newId = memoryDb.referrals.length > 0 ? Math.max(...memoryDb.referrals.map(r => r.id)) + 1 : 1;
    const item: MemoryReferral = {
      id: newId,
      commissioner_name,
      authority: authority || null,
      email,
      phone: phone || null,
      service_user_name,
      dob: dob || null,
      diagnosis: diagnosis || "Learning Disabilities & Autism Mix",
      funding_status: funding_status || "Secured",
      risk_details: risk_details || null,
      required_ratios: required_ratios || "1:1 Support Day & night",
      authority_type: authority_type || "CCG (NHS Commissioning)",
      created_at: new Date().toISOString()
    };
    memoryDb.referrals.push(item);
    return { insertId: newId };
  }
  
  // 7. INSERT INTO feedbacks
  if (/^INSERT INTO feedbacks/i.test(cleanSql)) {
    const [name, relationship, rating, message] = params;
    const newId = memoryDb.feedbacks.length > 0 ? Math.max(...memoryDb.feedbacks.map(f => f.id)) + 1 : 1;
    const item: MemoryFeedback = {
      id: newId,
      name,
      relationship: relationship || "Family Member / Circle of Care",
      rating: parseInt(rating || "5"),
      message,
      created_at: new Date().toISOString()
    };
    memoryDb.feedbacks.push(item);
    return { insertId: newId };
  }
  
  // 8. INSERT INTO applications
  if (/^INSERT INTO applications/i.test(cleanSql)) {
    const [name, email, phone, role, experience, statement] = params;
    const newId = memoryDb.applications.length > 0 ? Math.max(...memoryDb.applications.map(a => a.id)) + 1 : 1;
    const item: MemoryApplication = {
      id: newId,
      name,
      email,
      phone: phone || null,
      role,
      experience: experience || null,
      statement,
      created_at: new Date().toISOString()
    };
    memoryDb.applications.push(item);
    return { insertId: newId };
  }

  return [];
}

/**
 * Custom query wrapper that automatically retrieves the pool and runs a prepared query.
 * Reconnects on failure if the connection is lost.
 * Falls back gracefully to the in-memory engine if connection details are invalid or unreachable.
 */
export async function executeQuery<T>(sql: string, params: any[] = []): Promise<T> {
  if (isConfigured()) {
    try {
      const db = await getMySQLPool();
      const [results] = await db.execute(sql, params);
      return results as T;
    } catch (err: any) {
      console.warn(
        `Hostinger MySQL Query execution failed: ${err.message}. Gracefully falling back to in-memory fallback engine.`
      );
      if (err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT") {
        pool = null; // reset pool
      }
    }
  }

  // Fallback to memory
  return executeMemoryQuery(sql, params) as T;
}

/**
 * Health Check function to verify connection status.
 */
export async function testConnection(): Promise<{
  status: "connected" | "disconnected" | "unconfigured";
  error?: string;
  details?: {
    host: string;
    port: number;
    database: string;
    user: string;
  };
}> {
  const details = {
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT || "3306"),
    database: process.env.DB_NAME || "",
    user: process.env.DB_USER || "",
  };

  if (!isConfigured()) {
    return { status: "unconfigured", error: "Database environment variables are not set.", details };
  }
  try {
    const db = await getMySQLPool();
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    return { status: "connected", details };
  } catch (err: any) {
    return { status: "disconnected", error: err.message, details };
  }
}
