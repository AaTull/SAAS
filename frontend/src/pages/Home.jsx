import React from 'react';
import Menu from '../components/Menu.jsx';

export default function Home({ items, cartItems, onAdd, onRemove, totalItems, totalPrice, isOrderPlaced }) {
  return (
    <Menu
      items={items}
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={onRemove}
      totalItems={totalItems}
      totalPrice={totalPrice}
      isOrderPlaced={isOrderPlaced}
    />
  );
}


