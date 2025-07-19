import { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthLogic = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('timetracker_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simple demo authentication
    if (email === 'demo@gmail.com' && password === 'demo123') {
      const demoUser = {
        id: '1',
        name: 'John Doe',
        email: 'demo@gmail.com',
        avatar: ''
      };
      
      setUser(demoUser);
      localStorage.setItem('timetracker_user', JSON.stringify(demoUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('timetracker_user');
    localStorage.removeItem('timetracker_timesheets');
  };

  return {
    user,
    login,
    logout,
    isLoading
  };
};