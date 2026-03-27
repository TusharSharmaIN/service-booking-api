# Service Booking API

A RESTful API for managing service bookings, built with **Express 5**, **TypeScript**, **Prisma**, and **PostgreSQL**. Supports role-based access control (User/Admin), JWT authentication, and is deployed on Render.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express 5 |
| ORM | Prisma 7 (with driver adapters) |
| Database | PostgreSQL (Neon recommended) |
| Auth | JWT + bcryptjs |
| Validation | Zod |

---

## Project Structure

```
src/
├── app.ts              # Express app setup & route mounting
├── server.ts           # Entry point
├── config/             # DB/Prisma client config
├── controllers/        # Route handler logic
├── middlewares/        # Auth & role guards
├── models/             # Type definitions
├── routes/             # Route declarations
├── services/           # Business logic layer
└── utils/              # Helpers & utilities
prisma/
└── schema.prisma       # Database schema
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### 1. Clone & Install

```bash
git clone https://github.com/TusharSharmaIN/service-booking-api.git
cd service-booking-api
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=3000
DATABASE_URL="postgresql://your-neon-connection-string-here"
JWT_SECRET="your-jwt-secret-here"
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Start the Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

The API will be available at `http://localhost:3000`.

---

## API Reference

### Health Check

| Method | Endpoint | Auth |
|--------|----------|------|
| `GET` | `/health` | Public |

---

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive a JWT |

**Register body:**
```json
{
  "name": "Tushar",
  "email": "tushar@example.com",
  "password": "yourpassword"
}
```

**Login body:**
```json
{
  "email": "tushar@example.com",
  "password": "yourpassword"
}
```

---

### Services — `/api/services`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/services` | Public | List all active services |
| `GET` | `/api/services/:id` | Public | Get a service by ID |
| `POST` | `/api/services` | Admin only | Create a new service |

**Create service body:**
```json
{
  "name": "Haircut",
  "description": "Professional haircut service",
  "price": 299,
  "duration": 30
}
```

---

### Bookings — `/api/bookings`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/bookings` | User | Create a booking |
| `GET` | `/api/bookings/my` | User | Get the current user's bookings |
| `GET` | `/api/bookings` | Admin only | Get all bookings |

**Create booking body:**
```json
{
  "serviceId": "SERVICE_UUID",
  "scheduledAt": "2026-04-01T10:00:00.000Z",
  "notes": "First time visit"
}
```

> **Authentication**: Include the JWT in the `Authorization` header as `Bearer <token>`.

---

## Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID | Auto-generated |
| `name` | String | |
| `email` | String | Unique |
| `password` | String | Hashed with bcrypt |
| `role` | `USER` \| `ADMIN` | Default: `USER` |

### Service
| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID | Auto-generated |
| `name` | String | |
| `description` | String | |
| `price` | Float | |
| `duration` | Int | In minutes |
| `isActive` | Boolean | Default: `true` |

### Booking
| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID | Auto-generated |
| `userId` | UUID | FK → User |
| `serviceId` | UUID | FK → Service |
| `scheduledAt` | DateTime | |
| `status` | `PENDING` \| `CONFIRMED` \| `CANCELLED` \| `COMPLETED` | Default: `PENDING` |
| `notes` | String? | Optional |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |

---

## Deployment

This API is deployed on **Render** and accessible at:

```
https://service-booking-api-b8ma.onrender.com
```

To deploy your own instance:
1. Push your code to GitHub.
2. Create a new **Web Service** on Render.
3. Set the build command to `npm run build` and start command to `npm start`.
4. Add your environment variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`).

---

## Related Projects

- **Service Booking App** (Flutter) — Mobile client that consumes this API.
- **Service Booking Admin** (React/Next.js) — Admin panel for managing services and bookings.
