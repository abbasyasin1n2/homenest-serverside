const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("./homenest-clientside-firebase-adminsdk-fbsvc-7a462d44f7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnkbmnh.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Firebase Authentication Middleware
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  
  if (!authorization) {
    return res.status(401).send({ message: 'Unauthorized access - No token provided' });
  }

  const token = authorization.split(' ')[1];
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized access - Invalid token' });
  }
};

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const database = client.db("homenestDB");
    const propertiesCollection = database.collection("properties");
    const ratingsCollection = database.collection("ratings");

    // ==================== PUBLIC ROUTES ====================

    // Health check
    app.get('/', (req, res) => {
      res.send('HomeNest Server is running successfully!');
    });

    // Get all properties (with optional search and sort)
    app.get('/api/properties', async (req, res) => {
      try {
        const { search, sortBy, sortOrder } = req.query;
        
        let query = {};
        
        // Search by property name
        if (search) {
          query.propertyName = { $regex: search, $options: 'i' };
        }

        // Sorting
        let sort = {};
        if (sortBy) {
          sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
          sort.createdAt = -1; // Default: newest first
        }

        const properties = await propertiesCollection.find(query).sort(sort).toArray();
        res.send(properties);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching properties', error: error.message });
      }
    });

    // Get featured properties (6 most recent for homepage)
    app.get('/api/properties/featured', async (req, res) => {
      try {
        const properties = await propertiesCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .toArray();
        res.send(properties);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching featured properties', error: error.message });
      }
    });

    // Get single property by ID
    app.get('/api/properties/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const property = await propertiesCollection.findOne(query);
        
        if (!property) {
          return res.status(404).send({ message: 'Property not found' });
        }
        
        res.send(property);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching property', error: error.message });
      }
    });

    // Get ratings for a specific property
    app.get('/api/ratings/property/:propertyId', async (req, res) => {
      try {
        const propertyId = req.params.propertyId;
        const ratings = await ratingsCollection
          .find({ propertyId })
          .sort({ createdAt: -1 })
          .toArray();
        res.send(ratings);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching ratings', error: error.message });
      }
    });

    // ==================== PROTECTED ROUTES ====================

    // Add a new property (Protected)
    app.post('/api/properties', verifyToken, async (req, res) => {
      try {
        const property = req.body;
        
        // Verify the user email matches the token
        if (property.userEmail !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - Email mismatch' });
        }

        property.createdAt = new Date();
        property.updatedAt = new Date();
        
        const result = await propertiesCollection.insertOne(property);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error adding property', error: error.message });
      }
    });

    // Get properties by user email (Protected - My Properties)
    app.get('/api/properties/user/:email', verifyToken, async (req, res) => {
      try {
        const email = req.params.email;
        
        // Verify the user can only access their own properties
        if (email !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - Access denied' });
        }

        const properties = await propertiesCollection
          .find({ userEmail: email })
          .sort({ createdAt: -1 })
          .toArray();
        res.send(properties);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching user properties', error: error.message });
      }
    });

    // Update a property (Protected)
    app.put('/api/properties/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const updatedProperty = req.body;

        // First, get the existing property
        const existingProperty = await propertiesCollection.findOne({ _id: new ObjectId(id) });
        
        if (!existingProperty) {
          return res.status(404).send({ message: 'Property not found' });
        }

        // Verify ownership
        if (existingProperty.userEmail !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - You can only update your own properties' });
        }

        const filter = { _id: new ObjectId(id) };
        const update = {
          $set: {
            propertyName: updatedProperty.propertyName,
            description: updatedProperty.description,
            category: updatedProperty.category,
            price: updatedProperty.price,
            location: updatedProperty.location,
            imageUrl: updatedProperty.imageUrl,
            updatedAt: new Date()
          }
        };

        const result = await propertiesCollection.updateOne(filter, update);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error updating property', error: error.message });
      }
    });

    // Delete a property (Protected)
    app.delete('/api/properties/:id', verifyToken, async (req, res) => {
      try {
        const id = req.params.id;

        // First, get the existing property
        const existingProperty = await propertiesCollection.findOne({ _id: new ObjectId(id) });
        
        if (!existingProperty) {
          return res.status(404).send({ message: 'Property not found' });
        }

        // Verify ownership
        if (existingProperty.userEmail !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - You can only delete your own properties' });
        }

        const result = await propertiesCollection.deleteOne({ _id: new ObjectId(id) });
        
        // Also delete associated ratings
        await ratingsCollection.deleteMany({ propertyId: id });
        
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error deleting property', error: error.message });
      }
    });

    // Add a rating/review (Protected)
    app.post('/api/ratings', verifyToken, async (req, res) => {
      try {
        const rating = req.body;
        
        // Verify the user email matches the token
        if (rating.reviewerEmail !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - Email mismatch' });
        }

        rating.createdAt = new Date();
        
        const result = await ratingsCollection.insertOne(rating);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error adding rating', error: error.message });
      }
    });

    // Get ratings by user email (Protected - My Ratings)
    app.get('/api/ratings/user/:email', verifyToken, async (req, res) => {
      try {
        const email = req.params.email;
        
        // Verify the user can only access their own ratings
        if (email !== req.user.email) {
          return res.status(403).send({ message: 'Forbidden - Access denied' });
        }

        const ratings = await ratingsCollection
          .find({ reviewerEmail: email })
          .sort({ createdAt: -1 })
          .toArray();
        res.send(ratings);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching user ratings', error: error.message });
      }
    });

    // Ping MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection verified!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`HomeNest Server listening on port ${port}`);
});