import CookieConsent from 'react-cookie-consent';
import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBookPage from './pages/AdminBookPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/purchase/:title/:bookID/:price"
              element={<PurchasePage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminBooks" element={<AdminBookPage />} />
          </Routes>
        </Router>
        <CookieConsent />
        {/* This website uses cookies to enhance the user experience.
      </CookieConsent> */}
      </CartProvider>
    </>
  );
}

export default App;
