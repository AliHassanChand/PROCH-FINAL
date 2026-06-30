-- PRO Care Homes: Hostinger MySQL Database Schema
-- Compatible with MySQL 5.7+ and MySQL 8.0+

-- Ensure database collation is set to handle modern unicode characters gracefully (e.g. emojis/accents)
-- CREATE DATABASE IF NOT EXISTS pro_care_homes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE pro_care_homes;

-- 1. Local Authority Referrals (Secure Referrals Portal)
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

-- 2. General Family Inquiries (Contact/Inquiries)
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

-- 2. Family Messages (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS family_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  relation VARCHAR(255) DEFAULT 'Family Member / Guardian',
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Referrals Portal Submissions
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

-- 4. Feedbacks Submissions
CREATE TABLE IF NOT EXISTS feedbacks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  relationship VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Careers expressions of interest (Job Applications)
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
