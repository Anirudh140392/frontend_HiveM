import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import fpPromise from "@fingerprintjs/fingerprintjs";

const AuthContext = createContext(null);

// API base URL for auth requests
// In dev: uses "/api" (proxied by Vite to backend)
// In production: uses VITE_API_URL env var (e.g., https://backend.onrender.com/api)
const API_BASE = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "/api";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({
        email: "demo@trailytics.com",
        name: "Demo User",
        role: "admin",
        dbName: "demo_db"
    });
    const [isVerifying, setIsVerifying] = useState(false);

    const login = async (credentials) => {
        // Always succeed
        setIsLoggedIn(true);
        setUser({
            email: credentials.email || "demo@trailytics.com",
            name: "Demo User",
            role: "admin",
            dbName: "demo_db"
        });
        return { success: true };
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.clear();
    };

    // No need for verifySession effect in a pure frontend version
    useEffect(() => {
        setIsVerifying(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isVerifying }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
