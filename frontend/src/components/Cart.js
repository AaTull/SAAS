function Cart({ cart, onRemove, onDecrease, onIncrease }) {

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}

              {/* ➖ Decrease */}
              <button onClick={() => onDecrease(item.id)} style={{ margin: "0 5px" }}>
                -
              </button>

              {/* ➕ Increase */}
              <button onClick={() => onIncrease(item.id)} style={{ margin: "0 5px" }}>
                +
              </button>

              {/* 🗑️ Remove */}
              <button onClick={() => onRemove(item.id)} style={{ marginLeft: "10px" }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
