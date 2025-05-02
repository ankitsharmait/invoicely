import { useState, useEffect } from 'react';

function AddItem() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemUnit, setItemUnit] = useState('kg');
  const [items, setItems] = useState([]);

  // Load items from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);
  const handleAddItem = () => {
    if (itemName.trim() === '' || itemPrice === '') {
      alert('Please enter item name, price, and select unit.');
      return;
    }

    const newItem = { 
      id: Date.now(), 
      name: itemName.trim(), 
      price: parseFloat(itemPrice), 
      unit: itemUnit 
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));

    setItemName('');
    setItemPrice('');
    setItemUnit('kg');
    alert('Item added successfully!');
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const handleUpdatePrice = (id, newPrice) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, price: parseFloat(newPrice) } : item
    );
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Kirana Item</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="Item Name (e.g., Rice, Oil)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={itemUnit}
          onChange={(e) => setItemUnit(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md transition duration-300 mb-10"
      >
        ➕ Add Item
      </button>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Items</h3>

      <div className="w-full max-w-4xl space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">No items added yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-gray-600">
                  ₹{item.price} / {item.unit}
                </span>
              </div>
              {/* Update Price */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="New Price"
                  onChange={(e) => handleUpdatePrice(item.id, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold"
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
