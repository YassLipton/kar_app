import * as React from 'react';

const initialCartState = {
  cartItems: [],
  updateCartItems: () => {},
  totalPrice: 0,
  comment: '',
  promoCode: {
    code: '',
    discount: 0
  },
  clearCart: () => {},
}

const CartContext = React.createContext(initialCartState);

export default CartContext;