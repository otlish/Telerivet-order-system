"use client";

import React, { useEffect, useState } from "react";

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
    const stored = localStorage.getItem("delivery-items");
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
    handleInputChange(index, "status", value);

    const phoneNumber = items[index].phone;

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const result = await res.json();
      if (result.success) {
        console.log("Message sent successfully ✅", result.data);
      } else {
        console.error("Failed to send message ❌", result.error);
      }
    } catch (err) {
      console.error("Error hitting API ❌", err);
    }
  };

  const handleSave = () => {
    localStorage.setItem("delivery-items", JSON.stringify(items));
    alert("Saved to localStorage ✅");
  };

  return (
    <div className="p-8 bg-white text-black min-h-screen">
      <h1 className="text-4xl font-bold mb-2">Item Delivery Records</h1>
      <p className="text-gray-700 mb-6">
        Edit the details and click save to update records locally.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow">
          <thead className="bg-gray-100 hidden lg:table-header-group">
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
          <tbody className="block lg:table-row-group">
  {items.map((item, index) => (
    <tr
      key={index}
      className="block lg:table-row border-t border-gray-300 lg:border-0 mb-4 lg:mb-0 hover:bg-gray-50"
    >
      {/* Name */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Name</label>
        <input
          className="w-full p-1 border rounded"
          value={item.name}
          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
        />
      </td>

      {/* Phone no. */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Phone no.</label>
        <input
          className="w-full p-1 border rounded"
          value={item.phone}
          onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
        />
      </td>

      {/* Status */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Status</label>
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

      {/* Item Name */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Item Name</label>
        <input
          className="w-full p-1 border rounded"
          value={item.itemName}
          onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
        />
      </td>

      {/* Item Code */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Item Code</label>
        <input
          className="w-full p-1 border rounded"
          value={item.itemCode}
          onChange={(e) => handleInputChange(index, 'itemCode', e.target.value)}
        />
      </td>

      {/* Address */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Address</label>
        <input
          className="w-full p-1 border rounded"
          value={item.address}
          onChange={(e) => handleInputChange(index, 'address', e.target.value)}
        />
      </td>

      {/* Time */}
      <td className="block lg:table-cell px-4 py-2">
        <label className="block lg:hidden font-semibold text-gray-600 mb-1">Time</label>
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
