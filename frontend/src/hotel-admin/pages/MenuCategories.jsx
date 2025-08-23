import React, { useState, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react";

function MenuCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [hotelId] = useState(localStorage.getItem("hotelId")); // store after login

  // Fetch categories
  useEffect(() => {
    fetch(`/api/menu/categories/${hotelId}`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, [hotelId]);

  // Add category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const res = await fetch("/api/menu/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotelId, name: newCategory })
    });
    const data = await res.json();
    setCategories([data.category, ...categories]);
    setNewCategory("");
  };

  // Delete category
  const handleDelete = async (id) => {
    await fetch(`/api/menu/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter(c => c.category_id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Menu Categories</h1>

      {/* Add Category Form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={handleAddCategory}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-1" /> Add
        </button>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.category_id}
            className="flex items-center justify-between bg-white shadow-sm border rounded-lg p-4"
          >
            <span className="font-medium">{cat.name}</span>
            <div className="flex gap-2">
              <button className="p-2 text-blue-500 hover:text-blue-700">
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(cat.category_id)}
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

export default MenuCategories;
