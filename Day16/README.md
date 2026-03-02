# SkillSwap Hub (Day16)

Full-stack starter project with React + Vite frontend and Node.js + Express + MongoDB backend.

## Structure

- `frontend/` React app with pages, routes, auth context, and reusable components.
- `backend/` Express API with JWT auth, skill CRUD, and exchange request system.

## Backend Setup

1. Go to backend:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Create env:
   - Copy `.env.example` to `.env`
4. Start backend:
   - `npm run dev`

## Frontend Setup

1. Go to frontend:
   - `cd frontend`
2. Install dependencies:
   - `npm install`
3. Create env:
   - Copy `.env.example` to `.env`
4. Start frontend:
   - `npm run dev`

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/skills`
- `POST /api/skills`
- `PUT /api/skills/:id`
- `DELETE /api/skills/:id`
- `POST /api/requests`
- `GET /api/requests/me`
- `PATCH /api/requests/:id/status`

## Postman

- Import file: `backend/SkillSwap-Postman-Collection.json`
- Sample bodies: `backend/postman-sample-data.json`
- Set Postman variables:
  - `baseUrl = http://localhost:5000/api`
  - `token = <JWT token from login response>`
  - `skillId = <created skill _id>`
  - `requestId = <created request _id>`

### Recommended test order

1. `Health`
2. `Auth - Register` (for user 1)
3. `Auth - Register` (for user 2 with different email)
4. `Auth - Login` (copy token into `token` variable)
5. `Skills - Create` (copy `_id` into `skillId`)
6. `Skills - Get All`
7. `Requests - Create`
8. `Requests - My Requests` (copy request `_id` into `requestId`)
9. `Requests - Update Status`
