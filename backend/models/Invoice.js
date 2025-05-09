import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    items: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        unit: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate totals before saving
invoiceSchema.pre('save', function(next) {
    // Calculate item totals
    this.items.forEach(item => {
        item.total = item.price * item.quantity;
    });

    // Calculate invoice total
    this.totalAmount = this.items.reduce((sum, item) => sum + item.total, 0);

    next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice; 