
import React from 'react';
import { useAuth } from '../../../context/authContext/AuthContext';


const MyComponent = () => {
  const { token, user, saveToken } = useAuth();

  const handleSaveToken = () => {
    const newToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTIxYWE1MjIwMjI5OGNlMjE0NjhmY2E0YzMzZTJlZCIsInN1YiI6IjY2NjdmNmFkNzRhODY3NTllNGU5ZmI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LdQJZjr2TUPM98JzcqioMzyxAbPlUVtpwzasEUG7wTg';
    saveToken(newToken);
  };

  return (
    <div>
      {token ? (
        <div>
          <p>Token: {token}</p>
          <p>User ID: {user ? user.sub : 'No user data'}</p>
          <p>Login: {user ? user.login : 'No login data'}</p>
        </div>
      ) : (
        <p>No token found</p>
      )}
      <button onClick={handleSaveToken}>Save Token</button>
    </div>
  );
};
export default MyComponent;
