# Reusable Table component

## 📌 Overview

This project is a full-stack MERN assessment implementation including:

- A reusable React table component with filtering and sorting.
- An Express.js CRUD API using MySQL.
- Soft delete functionality using a `deleted_at` column.
- Restore functionality with a MySQL trigger enforcing a 30-day restriction.
- Integrated frontend and backend using concurrently.

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- JavaScript
- Custom CSS styling

**Backend**
- Node.js
- Express.js
- MySQL
- mysql2
- dotenv
- nodemon

**Database**
- MySQL 8+

---

## 📂 Project Structure


ReusableTablecomponent/
│
├── backend/
│ ├── routes/
│ ├── db.js
│ ├── index.js
│ ├── package.json
│ └── .env (not committed)
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── package.json (root - runs both apps)
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/RohithDUBBLY/ReusableTableComponent
cd ReusableTablecomponent
🗄 Database Setup

Open MySQL and run:

CREATE DATABASE digitivity;

USE digitivity;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  deleted_at DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
🔒 MySQL Trigger (30-Day Restore Rule)

Run this in MySQL:

DELIMITER $$

CREATE TRIGGER prevent_old_restore
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  IF OLD.deleted_at IS NOT NULL 
     AND NEW.deleted_at IS NULL
     AND DATEDIFF(NOW(), OLD.deleted_at) > 30 THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cannot restore product deleted more than 30 days ago';
  END IF;
END$$

DELIMITER ;
🔐 Backend Setup

Go to backend folder:

cd backend
npm install

Create .env file inside backend:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=digitivity

Run backend:

npm run dev

Backend runs on:

http://localhost:5000
💻 Frontend Setup

Go to frontend folder:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🚀 Run Frontend & Backend Together

From root folder:

npm install
npm run dev

This uses concurrently to start both servers.

📡 API Endpoints
Method	Endpoint	Description
GET	/products	Get all non-deleted products
POST	/products	Create new product
PUT	/products/:id	Update product
DELETE	/products/:id	Soft delete product
PATCH	/products/:id/restore	Restore product
🧠 Key Features

Reusable table component using props.

Client-side search and sorting.

Soft delete instead of hard delete.

Database-level enforcement using MySQL trigger.

Proxy configuration in Vite for clean API calls.

Clean project structure following best practices.

🏁 Notes

Soft delete is implemented using deleted_at.

Restore is restricted if deleted more than 30 days ago.

Environment variables are managed using dotenv.

.env file is excluded from version control.

👨‍💻 Author

Rohith R
MERN Stack Assessment Submission
