import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Printer, Receipt, Calendar, Clock } from "lucide-react";

function InvoicePage() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("currentOrder") || "{}");

  useEffect(() => {
    if (!order?.items || order.items.length === 0) {
      navigate("/"); // If accessed directly without an order
    }
  }, [order, navigate]);

  const subtotal = order.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans p-6 sm:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
          <Receipt className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Invoice</h1>
          <p className="text-green-100">Thanks for your order!</p>
        </div>

        <div className="p-8">
          {/* Header Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-green-600" />
                Order Details
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-600">Order ID:</span> <span className="font-bold text-gray-900">{order.orderId}</span></p>
                <p><span className="font-medium text-gray-600">Bill No:</span> <span className="font-bold text-gray-900">{order.orderId.replace("#ORD", "#INV")}</span></p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Date & Time
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-600">Date:</span> <span className="font-bold text-gray-900">{new Date(order.timestamp).toLocaleDateString()}</span></p>
                <p><span className="font-medium text-gray-600">Time:</span> <span className="font-bold text-gray-900">{new Date(order.timestamp).toLocaleTimeString()}</span></p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Order Items</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Item</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Qty</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600">₹{item.price}</td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <div className="space-y-3 text-right">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">Subtotal:</span>
                <span className="font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">GST (5%):</span>
                <span className="font-bold text-gray-900">₹{gst.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold">
                <span className="text-gray-900">Total Amount:</span>
                <span className="text-green-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.print()}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
            >
              <Printer className="w-5 h-5" />
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
