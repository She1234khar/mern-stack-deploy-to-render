const express=require('express');
require('dotenv').config();
const connectDB=require('./db');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const authrouter=require('./routes/auth-routes')
const adminproductroutes=require('./routes/admin/products-routes')
const adminOrdersroutes=require('./routes/admin/order-routes')
const shopProductsRouter = require('./routes/shop/products-route')
const shopCartsRouter = require('./routes/shop/cart-routes')
 const shopAddressRouter = require('./routes/shop/address-routes')
 const shopOrderRouter = require('./routes/shop/order-routes')
 const shopSearchRouter = require('./routes/shop/search-routes')
 const path = require('path');






// db();

const app=express();
app.use(express.json());

// app.get('/',(req,res)=>{
//    return res.send("hello");
// })
app.use(cookieParser());
 const port=process.env.PORT||5000;
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
// app.use(cookieParser());
console.log('1')
app.use('/api/auth',authrouter);
console.log('2')
app.use('/api/admin/products',adminproductroutes);
console.log('3')
app.use('/api/admin/order',adminOrdersroutes);
console.log('4')
app.use('/api/shop/products',shopProductsRouter);
console.log('5')
app.use('/api/shop/cart',shopCartsRouter);
console.log('6')
app.use('/api/shop/address', shopAddressRouter);
console.log('7')
app.use('/api/shop/order', shopOrderRouter);
console.log('8')

app.use('/api/shop/search',shopSearchRouter)
console.log('9')
const frontendPath = path.join(__dirname, '..', 'fronted', 'fronted1', 'dist');
app.use(express.static(frontendPath));
console.log('10');
app.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});
console.log('12')



connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running at");
  });
});
