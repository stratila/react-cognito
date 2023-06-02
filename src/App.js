import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login.js';
import SignUp from './SignUp.js';
import ConfirmEmail from './ConfirmEmail.js';
import Home from './Home.js';
import Navbar from './Navbar.js';
import { Auth } from 'aws-amplify';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const onLogin = async () => {
    checkAuthentication()
  }

  const onLogout = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }


  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout}/>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={onLogin} />} />
        <Route path="/login" element={isAuthenticated ? < Home /> : <Login onLogin={onLogin} />} />
        <Route path="/signup" element={isAuthenticated ? <Home/> : <SignUp />} />
        <Route path="/confirm-email/:email" element={isAuthenticated ? <Home/> : <ConfirmEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
