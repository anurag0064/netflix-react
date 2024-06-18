import { jwtDecode } from "jwt-decode";


export const getUserFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;
  
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken; 
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
