import React, { useState, useEffect } from 'react';
import apiService from './apiService';

const Home = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                // Make API call to fetch the username
                const response = await apiService.request('/users/', {})
                setEmail(response.email);
            } catch (error) {
                console.error('Error fetching email:', error);
                // Handle error
            }
        };

        fetchEmail();
    }, []);



    return (
        <div>
            <h2>Welcome to the Home Page!</h2>
            <p>Your email is: {email}</p>
        </div>
    );

};

export default Home;
