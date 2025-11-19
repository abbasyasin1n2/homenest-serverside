# HomeNest Server - Backend API
**Live Site:** https://homenestserver.vercel.app/

This is the Express.js backend for the HomeNest real estate portal. It handles all database operations, user authentication verification, and provides REST API endpoints for the frontend.

---

## What It Does

The server manages two main collections in MongoDB: properties and ratings.

For properties, it handles creating new listings, fetching all properties with search/sort/filter support, updating existing listings, and deleting properties. All modification operations require authentication and verify that the user owns the property before allowing changes.

For ratings, it stores user reviews with star ratings, fetches all reviews for a specific property, gets reviews submitted by a specific user, and allows users to delete their own reviews.

Authentication is handled through Firebase Admin SDK. When the frontend sends a request to a protected route, it includes a Firebase token in the Authorization header. The server verifies this token with Firebase, extracts the user's email, and then checks if the user has permission to perform the requested action.

---

## API Endpoints

### Public Routes

**Properties:**
- `GET /api/properties` – Get all properties (supports search, sort)
- `GET /api/properties/featured` – Get 6 most recent properties
- `GET /api/properties/:id` – Get single property details

**Ratings:**
- `GET /api/ratings/property/:propertyId` – Get all reviews for a property

### Protected Routes (Require Firebase Token)

**Properties:**
- `POST /api/properties` – Create new property
- `GET /api/properties/user/:email` – Get user's properties
- `PUT /api/properties/:id` – Update property (ownership verified)
- `DELETE /api/properties/:id` – Delete property (ownership verified)

**Ratings:**
- `POST /api/ratings` – Submit a review
- `GET /api/ratings/user/:email` – Get user's reviews
- `DELETE /api/ratings/:id` – Delete review (ownership verified)

---

## Authentication Flow

1. User logs in on the frontend using Firebase Authentication
2. Frontend receives a JWT token from Firebase
3. Frontend includes this token in the `Authorization: Bearer <token>` header for all API requests
4. Server's `verifyToken` middleware validates the token with Firebase Admin SDK
5. If valid, the decoded user info (email, uid) is attached to the request
6. Route handlers check if the user has permission to perform the action

For example, when updating a property, the server first checks if the property exists, then verifies that the `userEmail` field matches the authenticated user's email before allowing the update.

---

## Database Collections

### Properties
Each property document includes basic info (name, description, price, location, image), category data (Land/Plot, Commercial, Apartment), type-specific fields (bedrooms for apartments, floor details for commercial), rental fields if applicable (price unit, deposit, available date), features array, and timestamps.

### Ratings
Each rating document includes the property reference (ID, name, category, location), reviewer info (name, email), the actual rating (1-5 stars and review text), and timestamp.

---

## Technologies Used

- **Express.js** – Web framework
- **MongoDB** – Database with Mongoose-free native driver
- **Firebase Admin SDK** – Authentication verification
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variables

The server uses MongoDB's native driver instead of Mongoose to keep things simple and lightweight. All database queries use promises and async/await for clean, readable code.

---

## Environment Variables

The server expects a `.env` file with:
- `DB_USER` – MongoDB username
- `DB_PASSWORD` – MongoDB password
- `PORT` – Server port (default 3000)

It also requires the Firebase Admin SDK JSON file in the root directory for authentication.

---

## Running the Server

Start with `npm start` or use `npm run dev` for development mode with nodemon auto-restart. The seed script can be run with `npm run seed:properties` to populate the database with sample listings.
