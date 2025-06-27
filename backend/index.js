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






// db();

const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
   return res.send("hello");
})
app.use(cookieParser());
port=process.env.PORT||5000;
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
app.use('/api/auth',authrouter);
app.use('/api/admin/products',adminproductroutes);
app.use('/api/admin/order',adminOrdersroutes);
app.use('/api/shop/products',shopProductsRouter);
app.use('/api/shop/cart',shopCartsRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);

app.use('/api/shop/search',shopSearchRouter)



connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running at");
  });
});
