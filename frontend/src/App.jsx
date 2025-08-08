// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import menuData from "./menuData";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";

// Admin imports
import AdminHome from "./hotel-admin/pages/Home.jsx";
import AdminLogin from "./hotel-admin/pages/Login.jsx";
import AdminRegister from "./hotel-admin/pages/Register.jsx";
import AdminDashboard from "./hotel-admin/pages/Dashboard.jsx";
import AdminLayout from "./hotel-admin/components/AdminLayout.jsx";
import KitchenLogin from "./hotel-admin/pages/KitchenLogin.jsx";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = {
    name: "Radha Krishna",
    location: "FC Road, Pune",
    rating: "4.6",
  };

  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
    if (storedOrder?.items?.length > 0) {
      setCart(storedOrder.items);
      setIsOrderPlaced(true);
    }
  }, []);

  const addToCart = (item) => {
    const editableItem = cart.find(c => c.id === item.id && !c.locked);

    if (editableItem) {
      setCart(prev =>
        prev.map(c =>
          c.id === item.id && !c.locked
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
      return;
    }

    // If only locked version exists, add a fresh editable copy
    const newItem = {
      ...item,
      quantity: 1,
      locked: false,
      uid: Date.now(),
    };
    toast.success(`${item.name} added to cart 🛒`);
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => (i.uid || i.id) === id);
    if (item?.locked) return;
    setCart(prev => prev.filter(i => (i.uid || i.id) !== id));
  };

  const decreaseQuantity = (id) => {
    const item = cart.find(i => (i.uid || i.id) === id);
    if (item?.locked) return;
    setCart(prev =>
      prev
        .map(i =>
          (i.uid || i.id) === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const increaseQuantity = (id) => {
    const item = cart.find(i => (i.uid || i.id) === id);
    if (item?.locked) return;
    setCart(prev =>
      prev.map(i =>
        (i.uid || i.id) === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const placeOrder = () => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const orderId = `#ORD-${Date.now().toString().slice(-6)}`;

    const updated = cart.map(i => ({ ...i, locked: true }));

    localStorage.setItem("currentOrder", JSON.stringify({
      orderId,
      totalPrice: total,
      totalItems: updated.reduce((sum, i) => sum + i.quantity, 0),
      items: updated,
      timestamp: Date.now()
    }));

    setCart(updated);
    setIsOrderPlaced(true);
    toast.success("Order placed successfully ✅");
    setTimeout(() => navigate("/order-success"), 1000);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const gstAmount = subtotal * 0.05;
  const totalPrice = subtotal + gstAmount;
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="App font-sans bg-white min-h-screen">
      <Toaster position="top-center" />

      {/* Admin routes - no header */}
      {location.pathname.startsWith('/admin') || location.pathname.startsWith('/kitchen') ? (
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
          <Route path="/kitchen/login" element={<KitchenLogin />} />
        </Routes>
      ) : (
        /* Customer routes - with header */
        <>
          {location.pathname !== "/cart" && location.pathname !== "/order-success" && (
            <Header hotel={hotel} />
          )}
          <main className="pt-4 pb-28 px-2 sm:px-4">
            <Routes>
              <Route path="/" element={
                <Home
                  items={menuData}
                  cartItems={cart}
                  onAdd={addToCart}
                  onRemove={decreaseQuantity}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  isOrderPlaced={isOrderPlaced}
                />
              } />
              <Route path="/cart" element={
                <CartPage
                  cart={cart}
                  onRemove={removeFromCart}
                  onDecrease={decreaseQuantity}
                  onIncrease={increaseQuantity}
                  onPlaceOrder={placeOrder}
                  isOrderPlaced={isOrderPlaced}
                />
              } />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/invoice" element={<InvoicePage />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default function App() {
  return <Router><AppContent /></Router>;
}
