import WelcomeHeader from '../components/WelcomeHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
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
        <input type="number" value='${price}' disabled />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;
