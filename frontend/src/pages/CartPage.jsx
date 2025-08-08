import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus, Receipt, Clock } from "lucide-react";

function CartPage({ cart, onRemove, onIncrease, onDecrease, onPlaceOrder, isOrderPlaced }) {
    const [billNumber, setBillNumber] = useState("");

    useEffect(() => {
        const storedOrder = JSON.parse(localStorage.getItem("currentOrder"));
        if (storedOrder?.orderId) {
            setBillNumber(storedOrder.orderId);
        } else {
            const newBill = `#INV-${Date.now().toString().slice(-6)}`;
            setBillNumber(newBill);
        }
    }, []);

    // Group items by name
    const groupedCart = cart.reduce((acc, item) => {
        acc[item.name] = acc[item.name] || { lockedItems: [], editableItems: [] };
        if (item.locked) {
            acc[item.name].lockedItems.push(item);
        } else {
            acc[item.name].editableItems.push(item);
        }
        return acc;
    }, {});

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const gstRate = 0.05;
    const gstAmount = subtotal * gstRate;
    const total = subtotal + gstAmount;

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("currentOrder") || "{}");
        localStorage.setItem("currentOrder", JSON.stringify({
            ...stored,
            items: cart,
            totalPrice: total,
            totalItems: cart.reduce((sum, i) => sum + i.quantity, 0),
        }));
    }, [cart, total]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center text-green-700 font-semibold text-sm hover:text-green-800 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
                    </Link>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-green-50 px-4 py-2 rounded-full border border-amber-100">
                        <Receipt className="w-4 h-4 text-amber-600" />
                        <span className="font-bold text-sm">
                            <span className="text-amber-600">Hungry</span><span className="text-gray-800">Scan</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-3 sm:p-4 pb-[calc(7rem+env(safe-area-inset-bottom))]">
                {/* Bill Info */}
                <div className="mb-6 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Bill Number</p>
                            <p className="font-bold text-gray-900">{billNumber}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>Estimated: 20-25 mins</span>
                        </div>
                    </div>
                </div>

                {cart.length > 0 && cart.every(item => item.locked) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 text-center">
                        <p className="text-sm text-blue-800 font-medium">
                            🎉 You've placed your order! Feel free to return to the menu and add more items anytime.
                        </p>
                    </div>
                )}

                {Object.keys(groupedCart).length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                            <Receipt className="w-16 h-16 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-2xl font-semibold mb-2">Your cart is empty</p>
                        <p className="text-gray-400 text-base">Add some delicious items to get started!</p>
                    </div>
                ) : (
                    <>
                        {/* Grouped Items */}
                        <div className="space-y-3 mb-6">
                            {Object.entries(groupedCart).map(([dishName, { lockedItems, editableItems }]) => {
                                const referenceItem = lockedItems[0] || editableItems[0];
                                const itemImage = referenceItem.image;

                                return (
                                    <div key={dishName} className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 cart-item-compact">
                                        <div className="flex items-center gap-4">
                                            {/* Dish Image */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 shadow-medium">
                                                <img
                                                    src={itemImage || "https://via.placeholder.com/80"}
                                                    alt={dishName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/80"; }}
                                                />
                                            </div>

                                            {/* Dish Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{dishName}</h3>

                                                {/* Price and Quantity Controls */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-green-600 text-lg">₹{referenceItem.price}</span>

                                                        {/* Modern Quantity Counter */}
                                                        {editableItems.length > 0 && (
                                                            <div className="flex items-center justify-center bg-white border border-gray-200 rounded-full py-2 shadow-sm">
                                                                <button
                                                                    onClick={() => onDecrease(editableItems[0].uid || editableItems[0].id)}
                                                                    className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
                                                                >
                                                                    <Minus size={14} className="text-gray-600" />
                                                                </button>
                                                                <div className="flex-1 text-center flex items-center justify-center">
                                                                    <span
                                                                        key={editableItems[0].quantity}
                                                                        className="font-bold text-sm text-gray-900 animate-quantity-update"
                                                                    >
                                                                        {editableItems[0].quantity}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() => onIncrease(editableItems[0].uid || editableItems[0].id)}
                                                                    className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
                                                                >
                                                                    <Plus size={14} className="text-gray-600" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Modern Remove Button */}
                                                    {editableItems.length > 0 && (
                                                        <button
                                                            onClick={() => onRemove(editableItems[0].uid || editableItems[0].id)}
                                                            className="w-8 h-8 rounded-full remove-button-modern transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
                                                        >
                                                            <Trash2 size={14} className="text-red-500" />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Locked Items - Compact Display */}
                                                {lockedItems.length > 0 && (
                                                    <div className="mt-2 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                                            <p className="text-xs text-gray-600 font-medium">
                                                                🔒 Previously Ordered ×{lockedItems.reduce((sum, i) => sum + i.quantity, 0)}
                                                            </p>
                                                        </div>
                                                        <span className="font-bold text-gray-700 text-sm">₹{lockedItems.reduce((sum, i) => sum + i.price * i.quantity, 0)}</span>
                                                    </div>
                                                )}

                                                {/* Editable Items - Compact Display */}
                                                {editableItems.map((item) => (
                                                    <div key={item.uid || item.id} className="mt-2 flex items-center justify-between bg-green-50 rounded-lg px-3 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                            <p className="text-xs text-gray-600 font-medium">
                                                                🟢 Added Again ×{item.quantity}
                                                            </p>
                                                        </div>
                                                        <span className="font-bold text-green-600 text-sm">₹{item.price * item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bill Summary */}
                        <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-green-600" />
                                Bill Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-medium">Subtotal</span>
                                    <span className="font-bold text-base">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 font-medium">GST (5%)</span>
                                    <span className="font-bold text-base">₹{gstAmount.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-green-600 text-xl">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Place Order */}
                        {cart.some(item => !item.locked) && (
                            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 sm:px-6 py-4 shadow-strong rounded-t-2xl md:left-1/2 md:-translate-x-1/2 md:w-[min(92%,48rem)] mx-auto pb-[env(safe-area-inset-bottom)]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-lg font-bold text-gray-900">
                                            Total: ₹{total.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onPlaceOrder}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-strong flex items-center gap-2 transition-all duration-300 transform hover:scale-105 add-button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CartPage;
