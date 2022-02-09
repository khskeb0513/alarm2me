import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FindOneResponseDto } from '../component/user/find-one-response.dto';

interface AuthContextProps {
  user: FindOneResponseDto;
  logout: () => void;
}

export const AuthContext: Context<AuthContextProps> = createContext({
  logout: null,
  user: null,
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<FindOneResponseDto>(null);
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const logout = () => {
  if (confirm('Logout?')) {
    return fetch('/v1/auth/logout')
      .catch(() => {
        return;
      })
      .then(() => window.location.reload());
  }
};

const getUser = async (): Promise<FindOneResponseDto> => {
  const request = await fetch('/v1/user');
  if (request.status > 399) {
    return null;
  }
  const body = await request.json();
  return {
    email: body.email,
    name: body.name,
    sub: body.sub,
  };
};
