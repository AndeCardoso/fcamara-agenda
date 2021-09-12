import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
    const [logged, setLogged] = useState('');

    return (
        <AuthContext.Provider value={{ logged, setLogged }}>
            {props.children}
        </AuthContext.Provider>

    );
};

export const useLogged = () => useContext(AuthContext);