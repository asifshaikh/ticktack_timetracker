import { AuthContext, useAuthLogic } from '@/hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const auth = useAuthLogic();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};