import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                {item.title}: ${item.price.toFixed(2)} x{item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
                <button
                  onClick={() => removeFromCart(item.bookID)}
                  className="btn btn-danger ms-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button className="btn btn-success me-2">Checkout</button>
      <button
        className="btn btn-primary me-2"
        onClick={() => navigate('/books')}
      >
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
