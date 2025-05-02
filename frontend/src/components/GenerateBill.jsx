import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function GenerateBill() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState('');
  const [billItems, setBillItems] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const handleAddToBill = (item) => {
    if (quantity === '' || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
    const itemTotal = item.price * parseFloat(quantity);
    const billItem = { ...item, quantity: parseFloat(quantity), total: itemTotal };
    setBillItems([...billItems, billItem]);
    setSearch('');
    setQuantity('');
    showToast('✅ Item added to bill!');
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  const totalAmount = billItems.reduce((sum, item) => sum + item.total, 0);

  const handleDownloadPDF = () => {
    const input = document.querySelector('.print-area');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 print:hidden">🧾 Generate Bill</h2>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition duration-300 print:hidden">
          {toast}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 w-full max-w-3xl print:hidden">
        <input
          type="text"
          placeholder="Search Item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="w-full max-w-4xl mb-10 print:hidden">
        {search.trim() !== '' ? (
          items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
            items
              .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg p-4 shadow mb-4"
                >
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <span className="text-lg font-semibold">{item.name}</span>
                    <span className="text-gray-600 text-sm">₹{item.price} / {item.unit}</span>
                  </div>
                  <button
                    onClick={() => handleAddToBill(item)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold mt-2 md:mt-0"
                  >
                    ➕ Add
                  </button>
                </div>
              ))
          ) : (
            <p className="text-center text-red-500 font-medium">❌ No items found.</p>
          )
        ) : (
          <p className="text-gray-500 text-center">🔍 Start typing to search items...</p>
        )}
      </div>

      {/* Printable Area */}
      <div className="print-area bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">🧾 Invoice</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Price/Unit</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Unit</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.unit}</td>
                  <td className="p-3">₹{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mt-6">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </h2>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow transition duration-300"
        >
          📥 Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow transition duration-300"
        >
          🖨 Print Invoice
        </button>
      </div>
    </div>
  );
}

export default GenerateBill;
