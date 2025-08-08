// Menu.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Utensils, Soup, Salad, Sandwich, CupSoda, IceCream, ChefHat, ShoppingBag, Search, X,
} from "lucide-react";

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case "all": return <ChefHat size={18} className="mr-2" />;
    case "starters": return <Soup size={18} className="mr-2" />;
    case "salads": return <Salad size={18} className="mr-2" />;
    case "main course": return <Utensils size={18} className="mr-2" />;
    case "drinks": return <CupSoda size={18} className="mr-2" />;
    case "desserts": return <IceCream size={18} className="mr-2" />;
    default: return <Utensils size={18} className="mr-2" />;
  }
};

function Menu({ items, onAdd, onRemove, cartItems, totalItems, totalPrice, isOrderPlaced }) {
  const [search, setSearch] = useState("");
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRefs = useRef({});

  // Ripple effect function
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const categories = ["All", ...Array.from(new Set(items.map(s => s.category)))];

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
      const element = sectionRefs.current[cat];
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - offset, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24 font-sans">
      {/* Top Controls: Categories, Search, Veg Toggle (non-sticky) */}
      <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 space-y-3">
          {/* Search + Veg Toggle Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for your favorite dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white/90"
                aria-label="Search for dishes"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Veg Only Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">Veg Only</span>
              <button
                onClick={() => setOnlyVeg(!onlyVeg)}
                className={`relative w-11 sm:w-12 h-6 rounded-full transition-all duration-300 ${onlyVeg ? "bg-green-500 shadow" : "bg-gray-300"}`}
                role="switch"
                aria-checked={onlyVeg}
              >
                <span className={`absolute top-0.5 left-0.5 h-5 bg-white rounded-full shadow transition-all duration-300 ${onlyVeg ? "translate-x-6" : "translate-x-0"}`} style={{ width: '1.15rem' }} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl transition whitespace-nowrap text-xs sm:text-sm font-medium shadow-sm ${activeCategory === cat
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg ring-1 ring-amber-400/50"
                  : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200 hover:shadow"
                  }`}
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={activeCategory === cat}
              >
                <span className="hidden sm:inline-flex">{getCategoryIcon(cat)}</span> {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {items
          .filter(section => activeCategory === "All" || section.category === activeCategory)
          .map((section, idx) => {
            const filtered = section.items.filter(item => {
              const match = item.name.toLowerCase().includes(search.trim().toLowerCase());
              const isVeg = item.veg === true;
              return match && (!onlyVeg || isVeg);
            });

            if (filtered.length === 0) return null;

            return (
              <div key={idx} ref={el => sectionRefs.current[section.category] = el}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mr-3"></span>
                  {section.category}
                </h2>
                <div className="grid gap-4 sm:gap-6">
                  {filtered.map(item => {
                    const editable = cartItems.find(c => c.id === item.id && !c.locked);
                    return (
                      <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start gap-6">
                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-4 h-4 border-2 rounded ${item.veg ? "border-green-600 bg-green-50" : "border-red-600 bg-red-50"} flex items-center justify-center`}>
                                <div className={`w-2 h-2 rounded ${item.veg ? "bg-green-600" : "bg-red-600"}`}></div>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                            </div>
                            <p className="text-lg font-bold text-black-600 mb-2">₹{item.price}</p>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          </div>

                          {/* Image + Counter/Add */}
                          <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shadow-md">
                              <img
                                src={item.image || "https://via.placeholder.com/112"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/112"; }}
                              />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full px-2">
                              {editable && editable.quantity > 0 ? (
                                <div className="flex items-center justify-center bg-white shadow-lg rounded-full h-12 w-full border border-gray-200 quantity-counter animate-bounce-in">
                                  <button
                                    onClick={(e) => {
                                      createRipple(e);
                                      onRemove(editable?.uid || editable?.id || item.id);
                                    }}
                                    className="text-green-600 font-bold text-xl w-12 h-12 hover:bg-green-50 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 relative overflow-hidden flex items-center justify-center"
                                  >−</button>
                                  <div className="flex-1 text-center flex items-center justify-center">
                                    <span
                                      key={editable.quantity}
                                      className="quantity-number text-lg font-bold text-gray-900 animate-quantity-update"
                                    >
                                      {editable.quantity}
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      createRipple(e);
                                      onAdd(item);
                                    }}
                                    className="text-green-600 font-bold text-xl w-12 h-12 hover:bg-green-50 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 relative overflow-hidden flex items-center justify-center"
                                  >+</button>
                                </div>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    createRipple(e);
                                    onAdd(item);
                                  }}
                                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg rounded-full text-base hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 add-button animate-pulse-glow relative overflow-hidden"
                                >
                                  ADD
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[min(92%,48rem)] bg-gradient-to-r from-green-500 to-green-600 text-white flex justify-between items-center px-8 py-5 shadow-2xl rounded-2xl hover:from-green-600 hover:to-green-700 z-50 transition-all duration-300 transform hover:scale-105 animate-bounce-in"
          aria-label={`View cart with ${totalItems} items totaling ₹${totalPrice}`}
        >
          <span className="font-bold text-lg">
            {totalItems} item{totalItems > 1 ? "s" : ""} • ₹{totalPrice}
          </span>
          <span className="flex items-center gap-2 font-bold text-lg">
            <ShoppingBag size={28} className="animate-pulse-soft" /> View Cart <span className="text-xl">›</span>
          </span>
        </Link>
      )}
    </div>
  );
}

export default Menu;
