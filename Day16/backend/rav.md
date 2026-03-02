# SkillSwap Hub API + Postman Data

## Base URL

`http://localhost:5000/api`

## Postman Variables

- `baseUrl = http://localhost:5000/api`
- `token = ` (login response se set karo)
- `skillId = ` (create skill response se set karo)
- `requestId = ` (create request response se set karo)

## Common Headers

- `Content-Type: application/json`
- Protected routes ke liye:
  - `Authorization: Bearer {{token}}`

## API List

### GET APIs

1. `GET {{baseUrl}}/health`
2. `GET {{baseUrl}}/skills`
3. `GET {{baseUrl}}/requests/me` (Bearer token required)

### POST APIs

1. `POST {{baseUrl}}/auth/register`
2. `POST {{baseUrl}}/auth/login`
3. `POST {{baseUrl}}/skills` (Bearer token required)
4. `POST {{baseUrl}}/requests` (Bearer token required)

### PUT API

1. `PUT {{baseUrl}}/skills/{{skillId}}` (Bearer token required)

### PATCH API

1. `PATCH {{baseUrl}}/requests/{{requestId}}/status` (Bearer token required)

### DELETE API

1. `DELETE {{baseUrl}}/skills/{{skillId}}` (Bearer token required)

## JSON Data (Postman Body)

### 1) Register

`POST {{baseUrl}}/auth/register`

```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "password": "123456"
}
```

### 2) Register (Second User)

`POST {{baseUrl}}/auth/register`

```json
{
  "name": "Neha Gupta",
  "email": "neha@example.com",
  "password": "123456"
}
```

### 3) Login

`POST {{baseUrl}}/auth/login`

```json
{
  "email": "aman@example.com",
  "password": "123456"
}
```

### 4) Create Skill

`POST {{baseUrl}}/skills`

```json
{
  "title": "React Development",
  "category": "Web Development",
  "description": "I can teach React basics to advanced concepts."
}
```

### 5) Update Skill

`PUT {{baseUrl}}/skills/{{skillId}}`

```json
{
  "title": "React + Vite Development"
}
```

### 6) Create Exchange Request

`POST {{baseUrl}}/requests`

```json
{
  "skillId": "{{skillId}}",
  "message": "I can teach Node.js in exchange."
}
```

### 7) Update Request Status

`PATCH {{baseUrl}}/requests/{{requestId}}/status`

```json
{
  "status": "accepted"
}
```

## Postman Test Flow (Recommended)

1. `GET {{baseUrl}}/health`
2. `POST {{baseUrl}}/auth/register` (user1)
3. `POST {{baseUrl}}/auth/register` (user2)
4. `POST {{baseUrl}}/auth/login` (user1)
5. Login response token -> `token` variable set karo
6. `POST {{baseUrl}}/skills`
7. Skill response `_id` -> `skillId` variable set karo
8. `GET {{baseUrl}}/skills`
9. `POST {{baseUrl}}/requests`
10. Request response `_id` -> `requestId` variable set karo
11. `GET {{baseUrl}}/requests/me`
12. `PATCH {{baseUrl}}/requests/{{requestId}}/status`
13. `PUT {{baseUrl}}/skills/{{skillId}}`
14. `DELETE {{baseUrl}}/skills/{{skillId}}`

## Existing Files

- Postman Collection: `SkillSwap-Postman-Collection.json`
- Sample Data: `postman-sample-data.json`
