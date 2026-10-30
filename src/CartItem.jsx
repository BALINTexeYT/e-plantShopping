import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import PropTypes from 'prop-types';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => cart.reduce((total, item) => total + Number.parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);
  const calculateTotalCost = (item) => (Number.parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);

  const handleContinueShopping = (event) => {
    onContinueShopping(event);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    window.alert('Checkout is coming soon. Thanks for shopping with Paradise Nursery!');
  };

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <p className="eyebrow">Your green picks</p>
        <h1>Shopping Cart</h1>
        <p>Review your plants and adjust quantities before checkout.</p>
      </div>
      {cart.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-icon" aria-hidden="true">✿</div>
          <h2>Your cart is ready for a little green</h2>
          <p>Browse the collection and add a plant you love.</p>
          <button className="primary-button" type="button" onClick={handleContinueShopping}>Explore plants</button>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-topline"><div><h2 className="cart-item-name">{item.name}</h2><p className="cart-item-cost">{item.cost} <span>each</span></p></div>
                    <button className="cart-item-delete" type="button" onClick={() => handleRemove(item)} aria-label={`Remove ${item.name} from cart`}>Delete</button>
                  </div>
                  <div className="cart-item-bottomline">
                    <div className="cart-item-quantity" aria-label={`Quantity: ${item.quantity}`}>
                      <button className="cart-item-button" type="button" onClick={() => handleDecrement(item)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                      <span className="cart-item-quantity-value">{item.quantity}</span>
                      <button className="cart-item-button" type="button" onClick={() => handleIncrement(item)} aria-label={`Increase ${item.name} quantity`}>+</button>
                    </div>
                    <strong className="cart-item-total">${calculateTotalCost(item)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </section>
          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-line"><span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span><span>${calculateTotalAmount()}</span></div>
            <div className="summary-line"><span>Delivery</span><span className="delivery-note">Calculated at checkout</span></div>
            <div className="summary-total"><span>Total</span><strong>${calculateTotalAmount()}</strong></div>
            <button className="checkout-button" type="button" onClick={handleCheckoutShopping}>Checkout</button>
            <button className="continue-button" type="button" onClick={handleContinueShopping}>Continue Shopping</button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartItem;

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};
