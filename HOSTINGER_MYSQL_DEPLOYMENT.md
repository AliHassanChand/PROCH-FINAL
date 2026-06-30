# Hostinger MySQL Database Setup & Deployment Guide

This guide details how to set up and configure your Hostinger MySQL Database, import the relational tables schema, and deploy the PRO Care Homes application.

---

## 1. Create a MySQL Database on Hostinger

To connect this application to Hostinger MySQL, you must first create a database and database user inside your Hostinger hPanel:

1. Log in to your **Hostinger hPanel**.
2. Navigate to **Databases** -> **MySQL Databases**.
3. Under **Create a New MySQL Database and User**, enter the following:
   * **MySQL Database name**: e.g., `u123456789_pro_care` (Hostinger automatically adds a prefix).
   * **MySQL Username**: e.g., `u123456789_admin`.
   * **Password**: Create a secure password.
4. Click **Create**.
5. Note down the values for **MySQL Host** (usually `localhost` or an IP address like `185.224.138.XX` if connecting externally), Database Name, Username, and Password.

---

## 2. Import the Database Schema

To structure your Hostinger MySQL database, you can import our optimized relational schema:

1. In hPanel, go to **Databases** -> **MySQL Databases** and find your newly created database.
2. Click on the **phpMyAdmin** button to enter the database manager.
3. Select your database from the left-hand menu.
4. Click on the **SQL** tab.
5. Open `/src/db/schema.sql` from your project files and copy the entire content.
6. Paste the SQL statements into the SQL editor in phpMyAdmin.
7. Click **Go** to execute the query.

Alternatively, you can click on the **Import** tab, upload `/src/db/schema.sql`, and click **Go**.

---

## 3. Configure Environment Variables

The application uses safe server-side environment variables to authenticate with Hostinger MySQL securely without exposing passwords to the browser.

Set the following variables in your `.env` file (local development) or inside the **AI Studio Settings / Secrets Panel** (live preview & cloud run):

```env
# Hostinger MySQL Database Connection Configuration
DB_HOST=185.224.138.XX     # Hostinger MySQL server IP or "localhost" if hosting locally
DB_PORT=3306               # Standard MySQL Port
DB_NAME=u123456789_pro_care
DB_USER=u123456789_admin
DB_PASSWORD=YourSecurePassword Here
```

---

## 4. Secure Connection Pooling & Prepared Statement Safeguards

Our application employs standard enterprise practices to ensure excellent performance and security:
* **Connection Pooling**: Reuses active database connections to avoid the high overhead of establishing a new TCP handshake on every HTTP request.
* **Prepared Statements**: Uses strict binding placeholders (`?`) for all CRUD actions. This completely eliminates SQL Injection vulnerabilities.
* **Resilient Reconnecting**: Includes built-in reconnection protocols to dynamically re-establish connection if Hostinger drops or cycles idle database sockets.

---

## 5. Verification Checkpoints

* **Verify Connection**: Navigate to the **Daily Living Planner** section of the app. Look at the database badge. It will greenlight with *"Hostinger MySQL Server Connection Established — ACTIVE POOL"* when environment variables are successfully connected.
* **Verify CRUD operations**:
  1. Add a daily schedule care task in the task builder input.
  2. Verify that it inserts instantly and remains when refreshing the live log.
  3. Toggle the task complete checkbox. It will update the database state in real-time.
  4. Click the delete icon to remove the task from MySQL.
* **Verify Forms Persistence**: Submit a formal local authority referral or general family inquiry in the **Secure Referrals Portal**. It will display *"Family Message Received"* / *"Referral Received"* and successfully save the record to Hostinger MySQL!
