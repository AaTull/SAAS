// Updated OrderSuccess.js
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function OrderSuccess() {
  const navigate = useNavigate();

  const storedOrder = JSON.parse(localStorage.getItem("currentOrder") || "{}");
  const { totalItems, totalPrice, orderId } = storedOrder;

  useEffect(() => {
    if (!totalItems || !totalPrice || !orderId) {
      navigate("/");
    }
  }, [totalItems, totalPrice, orderId, navigate]);

  const handleAddMore = () => {
    localStorage.removeItem("currentOrder"); // 🧹 Clear previous order
    navigate("/", { replace: true }); // ⏭️ Go fresh to menu
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <CheckCircle size={72} className="text-green-500 mb-4 animate-bounce" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
      <p className="text-sm text-gray-600 mb-6">
        Your order <span className="font-semibold text-gray-800">{orderId}</span> has been placed.
      </p>

      <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-8 text-sm w-full max-w-md text-left shadow">
        <p className="mb-1">
          <span className="font-medium text-gray-700">Total Items:</span> {totalItems}
        </p>
        <p className="mb-1">
          <span className="font-medium text-gray-700">Total Price:</span> ₹{totalPrice.toFixed(2)}
        </p>
        <p>
          <span className="font-medium text-gray-700">Estimated Time:</span> 20–25 mins
        </p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={handleAddMore}
          className="px-6 py-2 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition"
        >
          Add More Items
        </button>

        <p className="text-gray-500 text-sm">
          Waiting for hotel staff to finalize your bill...
        </p>
      </div>
    </motion.div>
  );
}

export default OrderSuccess;


