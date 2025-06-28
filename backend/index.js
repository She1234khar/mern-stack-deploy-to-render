const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path'); // ✅ for serving frontend

// Route imports
const authrouter = require('./routes/auth-routes');
const adminproductroutes = require('./routes/admin/products-routes');
const adminOrdersroutes = require('./routes/admin/order-routes');
const shopProductsRouter = require('./routes/shop/products-route');
const shopCartsRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
  ],
  credentials: true
}));

// API Routes
app.use('/api/auth', authrouter);
app.use('/api/admin/products', adminproductroutes);
app.use('/api/admin/order', adminOrdersroutes);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartsRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);

// Serve frontend (Vite build in fronted/fronted1/dist)
const frontendPath = path.join(__dirname, '..', 'fronted', 'fronted1', 'dist');
app.use(express.static(frontendPath));

// Fallback route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server after DB connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
});
