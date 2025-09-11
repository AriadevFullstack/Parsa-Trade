// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// CORS config
app.use(cors({
  origin: ['https://persa-trade-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/products', productRoutes);
app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);

// Root route (for testing server)
app.get("/", (req, res) => {
  res.send("🚀 Server is running and connected to MongoDB ✅");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// DB Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error ❌", err);
  });

