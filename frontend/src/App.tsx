import './App.css';
import BookList from './BookList';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <BookList />
      <CookieConsent />
    </>
  );
}

export default App;
