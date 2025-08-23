import React, { useState, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react";

function MenuItems() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hotelId] = useState(localStorage.getItem("hotelId"));

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    isVeg: true,
    categoryId: ""
  });

  // Fetch categories + items
  useEffect(() => {
    fetch(`/api/menu/categories/${hotelId}`)
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch(`/api/menu/items/${hotelId}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, [hotelId]);

  // Add item
  const handleAddItem = async () => {
    const res = await fetch("/api/menu/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, hotelId })
    });
    const data = await res.json();
    setItems([data.item, ...items]);
    setForm({ name: "", description: "", price: "", isVeg: true, categoryId: "" });
  };

  // Delete item
  const handleDelete = async (id) => {
    await fetch(`/api/menu/items/${id}`, { method: "DELETE" });
    setItems(items.filter(i => i.item_id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Menu Items</h1>

      {/* Add Item Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-4 py-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border rounded-lg px-4 py-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border rounded-lg px-4 py-2 col-span-2"
          />
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isVeg}
              onChange={(e) => setForm({ ...form, isVeg: e.target.checked })}
            />
            Vegetarian
          </label>
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-1" /> Add Item
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.item_id}
            className="flex justify-between items-center bg-white border p-4 rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.name} – ₹{item.price}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-xs text-gray-400">
                {item.is_veg ? "🌱 Veg" : "🍗 Non-Veg"} | {item.category_name || "Uncategorized"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-blue-500 hover:text-blue-700">
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(item.item_id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
