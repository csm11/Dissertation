import { useState } from 'react';
import LoginPopup from './LoginPopup';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <button onClick={handleLoginButtonClick}>Login</button>
      {showPopup && <LoginPopup />}
    </div>
  );
}

export default App;

