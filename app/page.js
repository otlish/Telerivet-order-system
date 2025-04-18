'use client';

import React, { useEffect, useState } from 'react';

const statusOptions = ["Out for Delivery", "Delivered", "In Facility"];

const defaultData = [
  {
    name: "John Doe",
    phone: "1234567890",
    status: "Delivered",
    itemName: "Laptop",
    itemCode: "LP123",
    address: "123 Main St, Kathmandu",
    time: "2025-04-18 10:00 AM",
  },
  {
    name: "Jane Smith",
    phone: "9876543210",
    status: "Out for Delivery",
    itemName: "Smartphone",
    itemCode: "SP456",
    address: "456 Side Rd, Lalitpur",
    time: "2025-04-18 11:30 AM",
  },
];

export default function ItemsPage() {
  const [items, setItems] = useState(defaultData);

  useEffect(() => {
    const stored = localStorage.getItem('delivery-items');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleStatusChange = async (index, value) => {
    console.log(`Status changed at row ${index}: ${value}`);
    handleInputChange(index, 'status', value);
  
    const phoneNumber = items[index].phone;
  
    try {
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      const result = await res.json();
      if (result.success) {
        console.log('Message sent successfully ✅', result.data);
      } else {
        console.error('Failed to send message ❌', result.error);
      }
    } catch (err) {
      console.error('Error hitting API ❌', err);
    }
  };
  

  const handleSave = () => {
    localStorage.setItem('delivery-items', JSON.stringify(items));
    alert("Saved to localStorage ✅");
  };

  return (
    <div className="p-8 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Item Delivery Records</h1>
      <p className="text-gray-700 mb-6">Edit the details and click save to update records locally.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone no.</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Item_Name</th>
              <th className="px-4 py-2 text-left">Item_Code</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.phone}
                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    className="w-full p-1 border rounded bg-white"
                    value={item.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.itemCode}
                    onChange={(e) => handleInputChange(index, 'itemCode', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.address}
                    onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    className="w-full p-1 border rounded"
                    value={item.time}
                    onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition"
      >
        Save
      </button>
    </div>
  );
}
