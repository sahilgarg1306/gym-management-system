# 🏋️ Gym Management System

![Angular](https://img.shields.io/badge/Angular-Frontend-red.svg)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen.svg)
![JWT](https://img.shields.io/badge/Auth-JWT-orange.svg)
![RBAC](https://img.shields.io/badge/Access-Role%20Based-blue.svg)

A full-stack **Gym Management System** built with the **MEAN Stack** (MongoDB, Express.js, Angular, Node.js). The system supports two roles — **Admin** and **Instructor** — each with their own dedicated dashboard and permissions.

---

## 🌍 Live Demo

- **Frontend (Live Website):** https://gym-management-system-sigma-virid.vercel.app
- **Backend API:** https://gym-management-system-yjjk.onrender.com

> ⚠️ Note: Backend is hosted on Render and may take 30-50 seconds to wake up on the first request after inactivity.
---

## 🔐 Demo Credentials

**Admin Login**
- Email: admin@gmail.com
- Password: admin123

**Instructor Login**
- Email: instructor@gmail.com
- Password: instructor1234

---

## 🚀 Key Features

### 👑 Admin Module
- **Dashboard Analytics** — Overview of revenue, members, and activity
- **Instructor Management** — Add, view, and manage gym instructors
- **Member Management** — Full control over member records
- **Plan Management** — Create and manage membership plans
- **Scheme Management** — Configure pricing schemes and offers
- **Payment Management** — Track and record all payments
- **Reports & Revenue Tracking** — Visual insights into gym performance

### 🧑‍🏫 Instructor Module
- **Dashboard** — Personalized instructor view
- **Member Registration** — Register new members
- **Membership Renewal** — Handle renewals directly
- **Payment Tracking** — View payment records
- **Renewal Monitoring** — Track upcoming and overdue renewals

### 🔐 Authentication
- JWT-based login system
- Role-Based Access Control (Admin / Instructor)
- Protected routes and API endpoints per role

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| Angular | SPA Framework |
| TypeScript | Type-safe JavaScript |
| HTML + CSS | Structure & Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | REST API Framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| Bcrypt | Password Hashing |

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

---

### 1. Clone the Repository
```bash
git clone https://github.com/sahilgarg1306/gym-management-system.git
cd gym-management-system
```

---

### 2. Backend Setup
```bash
cd gym-backend
npm install
```

Create a `.env` file inside `gym-backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gym_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

Start the backend server:
```bash
npm start
```
> Backend runs at `http://localhost:5000`

---

### 3. Frontend Setup
```bash
cd gym-frontend
npm install
ng serve
```
> Frontend runs at `http://localhost:4200`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT token |

### Members
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/members` | Admin, Instructor |
| POST | `/api/members` | Admin, Instructor |
| PUT | `/api/members/:id` | Admin |
| DELETE | `/api/members/:id` | Admin |

### Instructors
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/instructors` | Admin |
| POST | `/api/instructors` | Admin |
| PUT | `/api/instructors/:id` | Admin |
| DELETE | `/api/instructors/:id` | Admin |

### Plans & Schemes
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/plans` | Admin |
| POST | `/api/plans` | Admin |
| GET | `/api/schemes` | Admin |
| POST | `/api/schemes` | Admin |

### Payments
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/payments` | Admin, Instructor |
| POST | `/api/payments` | Admin, Instructor |

### Reports
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/reports/revenue` | Admin |

---

## 🏗️ Architecture Highlights

- **Role-Based Access Control** — Middleware validates JWT and checks the user's role before allowing access to any protected route
- **Controller-Route-Model Pattern** — Backend follows a clean separation of concerns across controllers, routes, and Mongoose models
- **Angular Standalone Components** — Frontend built with modern Angular standalone component architecture
- **Protected Routes** — Angular route guards prevent unauthorized access to Admin or Instructor views

---

## 👨‍💻 Author

**Sahil Garg**
- GitHub: [@sahilgarg1306](https://github.com/sahilgarg1306)