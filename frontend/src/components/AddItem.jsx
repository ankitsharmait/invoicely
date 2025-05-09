import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemUnit, setItemUnit] = useState('kg');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load items from MongoDB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/items`);
        setItems(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load items. Please try again.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    if (itemName.trim() === '' || itemPrice === '') {
      alert('Please enter item name, price, and select unit.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/items`, {
        name: itemName.trim(),
        price: parseFloat(itemPrice),
        unit: itemUnit
      });
      
      setItems([...items, response.data]);
      setItemName('');
      setItemPrice('');
      setItemUnit('kg');
      alert('Item added successfully!');
      setError('');
    } catch (err) {
      setError('Failed to add item. Please try again.');
      console.error('Error adding item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter(item => item._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error('Error deleting item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/items/${id}`, {
        price: parseFloat(newPrice)
      });
      
      setItems(items.map(item => 
        item._id === id ? response.data : item
      ));
      setError('');
    } catch (err) {
      setError('Failed to update price. Please try again.');
      console.error('Error updating price:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Kirana Item</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="Item Name (e.g., Rice, Oil)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        />
        <select
          value={itemUnit}
          onChange={(e) => setItemUnit(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="pcs">pcs</option>
          <option value="liters">liters</option>
          <option value="ml">ml</option>
          <option value="dozen">dozen</option>
        </select>
      </div>

      <button
        onClick={handleAddItem}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md transition duration-300 mb-10 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Adding...' : '➕ Add Item'}
      </button>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Items</h3>

      <div className="w-full max-w-4xl space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center">Loading items...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-center">No items added yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg p-4 shadow flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-gray-600">
                  ₹{item.price} / {item.unit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="New Price"
                  onChange={(e) => handleUpdatePrice(item._id, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  disabled={loading}
                />
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold disabled:opacity-50"
                  disabled={loading}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddItem;
