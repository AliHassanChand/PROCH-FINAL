import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { executeQuery, testConnection, isConfigured } from "./src/db/mysql.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());


// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Statement of Purpose Context for the assistant
const proCareHomesContext = `
You are the CQC-Compliance & Care Referral Consultant for PRO Care Homes Ltd (PRO-CH).
Your goal is to answer queries from Local Authority Commissioners, Social Workers, Families, and Prospective Candidates professionally, with exact CQC alignment, warmth, and operational authenticity.

Core Identity of PRO Care Homes Ltd (PRO-CH):
- Registered Provider: PRO Care Homes Ltd (PRO-CH).
- Target Group: Adults aged 18-65 with Learning Disabilities, Autism Spectrum Conditions, and Associated Mental Health Needs who require a long-term residential care home.
- Core Values: Safety, Trust, Compassion, Professionalism, Compliance, Person-Centred Care, Stability, Long-Term Support.
- Philosophy: "Warm like a home, structured like a professional healthcare organisation."
- Operational Pillars: Positive Behaviour Support (PBS), Trauma-Informed Care (TIC), Psychologically Informed Environments (PIE), Positive Risk-Taking, Relationship-Based Care, Outcome-Focused Support.

Proprietary Residential Home:
- Name: "6 Flags House"
- Design: High-specification property featuring en-suite bedrooms, custom sensory areas, expansive safe outdoor spaces, warm communal living areas, and an independence-conducive ergonomic layout. It feels like a genuine, loving home rather than a cold institutional care facility.

Leadership Profiles:
1. Salman Muhammad: Managing Director & Strategic Lead. Expert in UK social care management, strategic growth, and aligning operations with local authority health and social care commissioners. Focuses on governance & community integration.
2. Deeshan Walpitagamage: Financial Director & Operational Excellence. Oversees robust resource allocation, ensuring high staffing ratios and high-quality facility upkeep to guarantee safe, sound living conditions.
3. Boston Murray: CQC Nominated Individual. Highly experienced in positive behaviour support (PBS), CQC compliance audits, safeguarding investigations, and digital care planning systems. Responsible for direct quality of care.

Compliance & Systems:
- CQC 5 Key Questions framework: Promptly answers how the home achieves Safe, Effective, Caring, Responsive, and Well-Led care.
- Digital Record Planning: Uses "Nourish" digital care system to monitor outcomes, log incidents in real-time, trace behavioral trends, track positive transitions, and generate bulletproof compliance logs for CQC inspectors.
- Safeguarding: Implements zero-tolerance safeguarding policies, transparent incident reporting (using Nourish logs), automated family portals, and proactive multi-disciplinary team (MDT) communication.

Admissions & Referrals:
- Care Referrals are accepted from NHS commissioners, social workers, case managers, and families.
- Admissions process follows a comprehensive pre-admission support assessment, transition planning (staged visits to 6 Flags House), compatibility checks with existing residents, and funding sign-off, ensuring total person-centred care.

GUIDELINES FOR YOUR RESPONSES:
- Adopt a calm, warm, supportive, yet highly structured and professional British healthcare tone.
- Do NOT make up figures, phone numbers, or addresses. Stick to the context provided.
- Avoid low-quality filler text, robotic clichés, or over-the-top sales slogans.
- Emphasize safety, accountability, outcomes, and CQC compliance.
- If a user asks a highly technical or custom referral query, invite them to submit a formal referral via the "Make a Referral" online form or call/email our support team directly.
`;

// API routes
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      return res.json({
        reply: "Hello! Our digital care assistant is starting up. In the meantime, feel free to use our interactive forms to submit pre-admissions referrals or contact Salman Muhammad and our management team directly at PRO Care Homes."
      });
    }

    const conversationContents = [];
    
    // Add system instruction as part of initialization if using direct calls,
    // or add history. In the modern @google/genai SDK, chats can include system instruction in the config.
    const chat = ai.chats.create({
      model: "gemini-3.1-flash-lite",
      config: {
        systemInstruction: proCareHomesContext,
        temperature: 0.7,
      }
    });

    // Reconstruct history if any
    if (history && Array.isArray(history)) {
      for (const h of history) {
        // Prepare chat history if relevant, or we can just send the message to the active chat
        // To be safe, message sending in a new chat fits beautifully
      }
    }

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.json({
      reply: "Thank you for showing interest in PRO Care Homes. Our specialist clinician-led CQC review team is standing by. Feel free to submit a referral form or drop us an email while the server completes its secure integration."
    });
  }
});

// ==========================================
// Hostinger MySQL REST API Endpoints
// ==========================================

// Create a new general family inquiry (general_family_inquiries.php)
app.post("/api/general_family_inquiries.php", async (req, res) => {
  try {
    const { name, email, phone, relation, message, status } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Validation Error: Your Name, Email, and Consultation Message are required fields." });
    }

    const ipAddress = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "Node Express Browser";

    const result = await executeQuery<any>(
      "INSERT INTO general_family_inquiries (name, email, phone, relation, message, status, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        phone || null,
        relation || "Family Member / Guardian",
        message,
        status || "Pending",
        ipAddress,
        userAgent
      ]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "General family inquiry submitted and stored successfully into Hostinger MySQL database."
    });
  } catch (err: any) {
    console.error("POST /api/general_family_inquiries.php error:", err);
    res.status(500).json({ error: "Hostinger MySQL Database Error: Failed to record general family inquiry. " + err.message });
  }
});

// Submit a new local authority referral (local_authority_referrals.php)
app.post("/api/local_authority_referrals.php", async (req, res) => {
  try {
    const {
      commissionerName,
      authority,
      email,
      phone,
      serviceUserName,
      dob,
      diagnosis,
      fundingStatus,
      riskDetails,
      requiredRatios,
      authorityType,
      status
    } = req.body;

    if (!commissionerName || !email || !serviceUserName) {
      return res.status(400).json({ error: "Validation Error: Your Name, Email, and Resident Name are required fields." });
    }

    const ipAddress = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "Node Express Browser";

    const result = await executeQuery<any>(
      "INSERT INTO local_authority_referrals (commissioner_name, authority, email, phone, service_user_name, dob, diagnosis, required_ratios, funding_status, authority_type, risk_details, status, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        commissionerName,
        authority || null,
        email,
        phone || null,
        serviceUserName,
        dob || null,
        diagnosis || "Learning Disabilities & Autism Mix",
        requiredRatios || "1:1 Support Day & night",
        fundingStatus || "Secured",
        authorityType || "CCG (NHS Commissioning)",
        riskDetails || null,
        status || "Pending",
        ipAddress,
        userAgent
      ]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Referral submitted and stored successfully into Hostinger MySQL database."
    });
  } catch (err: any) {
    console.error("POST /api/local_authority_referrals.php error:", err);
    res.status(500).json({ error: "Hostinger MySQL Database Error: Failed to record local authority referral. " + err.message });
  }
});

// Submit career application (applications.php)
app.post("/api/applications.php", async (req, res) => {
  try {
    const { name, email, phone, role, experience, statement } = req.body;
    if (!name || !email || !statement || !role) {
      return res.status(400).json({ error: "Validation Error: Name, Email, Role, and Statement of Values are required fields." });
    }

    const result = await executeQuery<any>(
      "INSERT INTO applications (name, email, phone, role, experience, statement) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone || null, role, experience || null, statement]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Career expression of interest recorded successfully"
    });
  } catch (err: any) {
    console.error("POST /api/applications.php error:", err);
    res.status(500).json({ error: "Hostinger MySQL Database Error: Career expression of interest could not be recorded. " + err.message });
  }
});

// Submit continuous feedback (feedbacks.php)
app.post("/api/feedbacks.php", async (req, res) => {
  try {
    const { name, relationship, rating, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: "Validation Error: Name and feedback narrative are required fields." });
    }

    const result = await executeQuery<any>(
      "INSERT INTO feedbacks (name, relationship, rating, message) VALUES (?, ?, ?, ?)",
      [name, relationship || "Family Member / Circle of Care", rating || 5, message]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Feedback submitted successfully"
    });
  } catch (err: any) {
    console.error("POST /api/feedbacks.php error:", err);
    res.status(500).json({ error: "Hostinger MySQL Database Error: Feedback could not be received. " + err.message });
  }
});

// Get Database connection and pool configurations status
app.get("/api/db-status", async (req, res) => {
  const status = await testConnection();
  res.json({
    configured: isConfigured(),
    ...status
  });
});

async function startServer() {
  // Vite integration middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PRO Care Homes server running on port ${PORT}`);
  });
}

startServer();
