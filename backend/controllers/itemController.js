import Item from '../models/Item.js';

// Get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ name: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search items
export const searchItems = async (req, res) => {
    try {
        const { query } = req.query;
        const items = await Item.find({
            name: { $regex: query, $options: 'i' }
        }).sort({ name: 1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create item
export const createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        unit: req.body.unit
    });
    console.log(req.body);

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update item
export const updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                unit: req.body.unit
            },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete item
export const deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 