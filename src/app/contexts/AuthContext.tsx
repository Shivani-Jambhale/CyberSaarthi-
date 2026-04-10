import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface AuthContextType {
  user: string | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    const savedUserData = localStorage.getItem("authUserData");
    if (savedUser && savedUserData) {
      setUser(savedUser);
      setUserDataState(JSON.parse(savedUserData));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Accept any email ending with @gmail.com and any password
    if (email.endsWith("@gmail.com") && password.trim() !== "") {
      // Extract name from email (part before @gmail.com)
      const userName = email.split("@")[0];
      const userData: UserData = {
        name: userName,
        email: email,
        phone: "",
        city: "",
      };
      setUser(userName);
      setUserDataState(userData);
      setIsAuthenticated(true);
      localStorage.setItem("authUser", userName);
      localStorage.setItem("authUserData", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setUserDataState(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authUserData");
  };

  const signup = (data: UserData) => {
    setUser(data.name);
    setUserDataState(data);
    setIsAuthenticated(true);
    localStorage.setItem("authUser", data.name);
    localStorage.setItem("authUserData", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, userData, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
