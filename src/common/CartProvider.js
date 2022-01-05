import * as React from 'react';
import CartContext from '../context/cart-context';

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [promoCode, setPromoCode] = React.useState(undefined || {});
  const [deliveryPrice, setDeliveryPrice] = React.useState(0);

  const updateCartItems = React.useCallback(
    (items, total) => {
      setCartItems(items)
      setTotalPrice(total)
      setComment(comment)
      setPromoCode(promoCode)
    },
    [],
  );

  const clearCart = React.useCallback(() => {
    setCartItems([]);
    setTotalPrice(0);
    setComment('');
    setPromoCode(undefined || {})
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        updateCartItems,
        totalPrice,
        comment,
        promoCode,
        setPromoCode,
        deliveryPrice,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;