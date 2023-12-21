const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require("cors");
require('dotenv').config();

// Firebase admin initialization
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors({
  origin: [
    "https://toxboxes.com",
    "http://localhost:3000",
    "http://127.0.0.1:5500"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  optionsSuccessStatus: 204 // some use 204 for no content
}));


app.use(bodyParser.json());

// Endpoint for email signup
app.post('/signup', async (req, res) => {
  const userEmail = req.body.email;
  // Check for duplicate emails in Firestore
  const emailsRef = db.collection('emails');
  const snapshot = await emailsRef.where('email', '==', userEmail).get();
  if (snapshot.empty) {
    await db.collection('emails').add({ email: userEmail });
    res.status(200).json({ message: 'Success! Your email has been added! You will receive all further updates about Tox Box.' });
  } else {
    res.status(400).json({ message: 'Email has already been added.' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
