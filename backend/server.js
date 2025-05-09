import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api/items', itemRoutes);
app.use('/api/invoices', invoiceRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Shopkeeper API' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://ankitsharmabela:c%40AjiCm2%21GbgmNf@cluster0.f7liary.mongodb.net/invoicely", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};
startServer();