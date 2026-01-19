CREATE TABLE users (
  id SERIAL PRIMARY KEY,

  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,

  father_name VARCHAR(100),
  father_mobile VARCHAR(20),
  father_email VARCHAR(150),

  mother_name VARCHAR(100),
  mother_mobile VARCHAR(20),
  mother_email VARCHAR(150),

  dob DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  nationality VARCHAR(50) DEFAULT 'Indian',

  email VARCHAR(150) NOT NULL,
  mobile VARCHAR(20) NOT NULL,

  city VARCHAR(100),
  state VARCHAR(100),
  pin_code VARCHAR(10),

  highest_qualification VARCHAR(100) NOT NULL,
  university VARCHAR(200) NOT NULL,
  semester VARCHAR(50),
  cgpa NUMERIC(3,2) NOT NULL,
  graduation_year INT,

  work_experience JSONB,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);