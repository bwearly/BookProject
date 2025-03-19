import './App.css';
import BookList from './BookList';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <BookList />
      <CookieConsent />
      {/* This website uses cookies to enhance the user experience.
      </CookieConsent> */}
    </>
  );
}

export default App;
