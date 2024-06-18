import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../../components/input/Input';
import background from "../../../assets/images/background.webp";
import Button from '../../../components/buttons/Button';
import { useAuth } from '../../../context/authContext/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { saveToken } = useAuth();

    const handleSaveToken = () => {
        const newToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTIxYWE1MjIwMjI5OGNlMjE0NjhmY2E0YzMzZTJlZCIsInN1YiI6IjY2NjdmNmFkNzRhODY3NTllNGU5ZmI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LdQJZjr2TUPM98JzcqioMzyxAbPlUVtpwzasEUG7wTg';
        saveToken(newToken);
      };


    const handleLogin = async (e) => {
        console.log('dsvsd-----,dsds');
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('/api/login', { email, password });
            localStorage.setItem('accessToken', response.data.token);
            window.location.href = '/';
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('dgdf--dfgdfgdfg:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="absolute inset-0 bg-cover bg-center blur-sm" style={{ backgroundImage: `url(${background})` }} />
            <div className="relative z-10 bg-opacity-100 bg-gray-900 p-8 rounded-2xl shadow-md max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <Input
                        type="email"
                        label="Your Email"
                        placeholder="name@mail.com"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="********"
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Button
                        text="Sign In"
                        type="submit"
                        className="bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 items-center w-full"
                        onClick={handleSaveToken}
                    />
                    <div className="flex justify-between items-center text-gray-500 mt-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox h-4 w-4" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="hover:underline">
                            Need help?
                        </a>
                    </div>
                </form>
                <p className="text-gray-500 mt-8">
                    New to Netflix?{' '}
                    <a href="#" className="text-white hover:underline">
                        Sign up now
                    </a>
                </p>
            </div>
        </div>
    );
}
export default Login;

