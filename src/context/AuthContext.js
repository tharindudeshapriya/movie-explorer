import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [storedUser, setStoredUser] = useLocalStorage("user", null);
    const [user, setUser] = useState(storedUser);

    useEffect(() => {
        setStoredUser(user);
    }, [user, setStoredUser]);

    const login = (username, password) => {
        // Dummy auth: in production, replace with real API
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");
        if (registeredUsers[username] && registeredUsers[username] === password) {
            setUser({ username });
            return Promise.resolve();
        }
        return Promise.reject();
    };

    const register = (username, password) => {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");
        if (registeredUsers[username]) {
            return Promise.reject();
        }
        registeredUsers[username] = password;
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        return Promise.resolve();
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
