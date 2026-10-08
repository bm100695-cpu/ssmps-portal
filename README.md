# Smart School Management System

A comprehensive, production-ready full-stack School Management Platform built with the MERN stack (MongoDB, Express, React, Node.js). 

This system features robust Role-Based Access Control (RBAC) supporting 6 distinct user profiles: **Admin, Principal, Teacher, Driver, Parent, and Student.**

---

## 🌟 Core Features

### 1. Multi-Role Dashboards & Security
- **JWT Authentication**: Secure `httpOnly` cookie-based sessions.
- **RBAC**: Middleware specifically tailored to restrict backend API access by role.
- **Custom Portals**: 
  - **Admin**: Complete system overview, student admissions, user (staff) management, academic schedules, and finance.
  - **Principal**: High-level analytics, staff attendance monitoring, and quick alert resolutions.
  - **Teacher**: Timetable management, homework distribution, and student grading.
  - **Driver**: Interactive live-trip toggles, route visualization, and GPS tracking simulator.
  - **Student**: "Emerald" themed portal for checking homework deadlines, timetables, and grades.
  - **Parent**: "Indigo" themed portal linking directly to their child's snapshot, fee payment portals, and bus tracking.

### 2. Registration Verification System
Students and Parents cannot simply sign up. They must be pre-admitted by the Admin (which creates a `StudentRecord` tied to an Admission Number and Roll Number). The registration portal dynamically verifies these credentials before allowing account creation, preventing unauthorized access.

### 3. Integrated Modules
- **Academic & Classes**: Manage class structures (Sections, Teachers) and define Subjects (Theory/Practical).
- **Transport**: Manage fleets, track bus capacity, assign routes, and simulate live GPS location tracking.
- **Finance**: Generate dynamic Fee Invoices (Tuition, Library, Transport, etc.), track pending dues, and securely mark transactions as Paid (generating transaction IDs).

---

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- Tailwind CSS (Utility-first styling, Custom Themes per Role)
- Lucide React (Iconography)
- Axios (API Client)
- React Router DOM (Protected Routing)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Object Data Modeling)
- JSON Web Tokens (JWT) & bcrypt.js (Security)
- Cookie-Parser

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine and a MongoDB instance running (either local or MongoDB Atlas).

### 1. Environment Setup

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/school_management
JWT_SECRET=your_super_secret_key_change_me
NODE_ENV=development
```

### 2. Installation

Open your terminal and run the following to install dependencies for both the frontend and backend:

```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 3. Running the Application

To run the application locally, you will need two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd backend
npm run dev
```
*(Server will start on http://localhost:5000)*

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
```
*(Client will start on http://localhost:5173 or the port provided by Vite)*

---

## 📝 Testing Flow

1. **Start as Admin**: First, run the `backend/src/scripts/seedAdmin.js` if it exists, or manually register an Admin directly into the DB.
2. **Add Staff**: Log in as Admin, navigate to **Users**, and add a Principal, Teacher, and Driver.
3. **Admit a Student**: Navigate to **Students** as the Admin and "Admit" a new student (Give them Admission Number: `1001`, Roll Number: `12`).
4. **Register**: Go to the public `/register` page and select **Student**. Fill out the details matching `1001` and `12` to successfully link the account.
5. **Explore**: Log into each respective portal to view the dynamic dashboards and module features!

---

*Built for scalability, security, and exceptional user experience.*
