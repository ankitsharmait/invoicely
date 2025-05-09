import Invoice from '../models/Invoice.js';

// Get all invoices
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create invoice
export const createInvoice = async (req, res) => {
    const invoice = new Invoice({
        items: req.body.items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            unit: item.unit,
            total: item.price * item.quantity
        }))
    });

    try {
        const newInvoice = await invoice.save();
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get single invoice
export const getInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 