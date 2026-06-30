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

  const createTodosTable = `
    CREATE TABLE IF NOT EXISTS todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      is_complete TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_todos_complete (is_complete)
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
  await db.query(createTodosTable);
  await db.query(createFamilyMessagesTable);
  await db.query(createReferralsTable);
  await db.query(createFeedbacksTable);
  await db.query(createApplicationsTable);
  console.log("Hostinger MySQL tables initialized successfully.");
}

// ==========================================
// IN-MEMORY COMPATIBILITY DATABASE ENGINE
// ==========================================
interface MemoryTodo {
  id: number;
  name: string;
  is_complete: number;
  created_at: string;
}

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
  todos: [
    { id: 1, name: "Establish safe medication log checking", is_complete: 0, created_at: new Date().toISOString() },
    { id: 2, name: "Coordinate speech therapy compatibility review", is_complete: 1, created_at: new Date().toISOString() },
    { id: 3, name: "PBS plan dynamic triggers audit with Boston Murray", is_complete: 0, created_at: new Date().toISOString() }
  ] as MemoryTodo[],
  family_messages: [] as MemoryFamilyMessage[],
  referrals: [] as MemoryReferral[],
  feedbacks: [] as MemoryFeedback[],
  applications: [] as MemoryApplication[],
};

function executeMemoryQuery(sql: string, params: any[]): any {
  const cleanSql = sql.trim().replace(/\s+/g, " ");
  
  // 1. SELECT * FROM todos
  if (/^SELECT \* FROM todos/i.test(cleanSql)) {
    return [...memoryDb.todos].sort((a, b) => b.id - a.id);
  }
  
  // 2. INSERT INTO todos
  if (/^INSERT INTO todos/i.test(cleanSql)) {
    const name = params[0];
    const isComplete = params[1] !== undefined ? (params[1] ? 1 : 0) : 0;
    const newId = memoryDb.todos.length > 0 ? Math.max(...memoryDb.todos.map(t => t.id)) + 1 : 1;
    const item: MemoryTodo = {
      id: newId,
      name,
      is_complete: isComplete,
      created_at: new Date().toISOString()
    };
    memoryDb.todos.push(item);
    return { insertId: newId };
  }
  
  // 3. UPDATE todos SET is_complete
  if (/^UPDATE todos SET is_complete/i.test(cleanSql)) {
    const isComplete = params[0] ? 1 : 0;
    const id = parseInt(params[1]);
    const todo = memoryDb.todos.find(t => t.id === id);
    if (todo) {
      todo.is_complete = isComplete;
    }
    return { affectedRows: todo ? 1 : 0 };
  }
  
  // 4. DELETE FROM todos
  if (/^DELETE FROM todos/i.test(cleanSql)) {
    const id = parseInt(params[0]);
    const initialLen = memoryDb.todos.length;
    memoryDb.todos = memoryDb.todos.filter(t => t.id !== id);
    return { affectedRows: initialLen - memoryDb.todos.length };
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
export async function testConnection(): Promise<{ status: "connected" | "disconnected" | "unconfigured"; error?: string }> {
  if (!isConfigured()) {
    return { status: "unconfigured", error: "Database environment variables are not set." };
  }
  try {
    const db = await getMySQLPool();
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    return { status: "connected" };
  } catch (err: any) {
    return { status: "disconnected", error: err.message };
  }
}
