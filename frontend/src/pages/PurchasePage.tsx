import WelcomeHeader from '../components/WelcomeHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity: Number(quantity),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeHeader />
      <h2>Purchase {title}</h2>

      <div>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            value={price}
            disabled
            className="form-control"
          />
        </div>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(q) => setQuantity(Number(q.target.value))}
          className="form-control mt-1"
        />
        <button onClick={handleAddToCart} className="btn btn-success mt-2 mb-2">
          Add to Cart
        </button>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mt-1">
        Go Back
      </button>
    </>
  );
}

export default PurchasePage;
