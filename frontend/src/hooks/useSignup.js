import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await res.json();
        if (res.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            //update AuthContext
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setError(json.error);
        }


    }
    return { signup, isLoading, error }
}