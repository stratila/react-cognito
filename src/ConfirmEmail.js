import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useParams } from 'react-router-dom';

const ConfirmEmail = () => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const { email } = useParams();

  const handleConfirmEmail = async (e) => {
    e.preventDefault();
    try {
      const confirmation = await Auth.confirmSignUp(email, confirmationCode);
      console.log('Email confirmed successfully:', confirmation);
      // Redirect to login page or perform any necessary actions after confirming email
    } catch (error) {
      console.error('Error confirming email:', error);
      // Handle confirmation error
    }
  };

  return (
    <div>
      <h2>Confirm Email</h2>
      <form onSubmit={handleConfirmEmail}>
        <div>
          <label>Confirmation Code:</label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Confirm Email</button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
