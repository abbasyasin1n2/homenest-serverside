# HomeNest Server - API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
Protected routes require Bearer token in Authorization header:
```
Authorization: Bearer <firebase_token>
```

## API Endpoints

### Public Routes

#### GET /
Health check endpoint

#### GET /api/properties
Get all properties with optional search and sort
- Query params: `search`, `sortBy`, `sortOrder`

#### GET /api/properties/featured
Get 6 most recent properties for homepage

#### GET /api/properties/:id
Get single property by ID

#### GET /api/ratings/property/:propertyId
Get all ratings for a specific property

### Protected Routes (Require Authentication)

#### POST /api/properties
Add a new property

#### GET /api/properties/user/:email
Get all properties by user email

#### PUT /api/properties/:id
Update a property (owner only)

#### DELETE /api/properties/:id
Delete a property (owner only)

#### POST /api/ratings
Add a rating/review

#### GET /api/ratings/user/:email
Get all ratings by user email

## Setup

1. Create `.env` file with:
```
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
PORT=3000
```

2. Start server:
```
npm start
```

