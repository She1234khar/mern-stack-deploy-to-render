const paypal = require('../../helpers/paypal');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

//const product=require('../../models/Product')

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map(item => ({
              name: item.title,
              price:item.price.toFixed(2),
              currency: 'USD',
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2),
          },
          description: 'Order payment',
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error('Error creating PayPal payment:', error);
        return res.status(500).json({
          success: false,
          message: 'Error creating PayPal payment',
        });
      }

      // Save order details to the database
      const newOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate: new Date(orderDate),
        orderUpdateDate: new Date(orderUpdateDate),
        paymentId,
        payerId,
      });

      await newOrder.save();

      const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url')?.href;

      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        approvalURL,
        orderId: newOrder._id,
      });
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.paymentStatus = 'paid';
    order.paymentId = paymentId;
    order.payerId = payerId;
    order.orderStatus = 'completed';

    const cartId = order.cartId;

    // for(let item of order.cartItems){
    //   let product = await Product.findById(item.productId);
    //   if(!product){
    //     return res.status(404).json({
    //       success: false,
    //       message: `Not enough stock for this product`,
    //       });
    //   }
    //   product.quantity -= item.quantity;
    //   await product.save();
    // }


    
    await Cart.findByIdAndDelete(cartId);

    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Payment captured successfully and cart cleared!',
      data: order,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Some error occurred!',
    });
  }
};

const getAllOrdersByUser=async (req, res) => {
  try{
    const {userId} =req.params;
    const orders = await Order.find({ userId })
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred while fetching orders!',
    });
  }
}

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order details fetched successfully',
      data: order,
    });

  }catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: 'Some error occurred while fetching order details!',
    });
  }
}



module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
