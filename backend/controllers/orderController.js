import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(404);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc Update order to pay
// @route GET /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('update order to paid');
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to delivered');
});

// @desc Get Orders
// @route GET /api/orders
// @access Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send('get orders');
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
}