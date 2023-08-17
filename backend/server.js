import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 6000;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
    res.send("API IS Running.....");
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Is Running On Port: ${port}`))