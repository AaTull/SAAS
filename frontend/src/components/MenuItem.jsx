// MenuItem.js
import React from "react";

function MenuItem({ item, onAdd }) {
  return (
    <div>
      <h4>{item.name} - ₹{item.price}</h4>
      <button onClick={() => onAdd(item)}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
