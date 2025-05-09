import express from 'express';
import {
    getInvoices,
    createInvoice,
    getInvoice
} from '../controllers/invoiceController.js';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// Get all invoices
router.get('/', getInvoices);

// Create invoice
router.post('/', createInvoice);

// Get single invoice
router.get('/:id', getInvoice);

// Update invoice
router.put('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        await Invoice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
