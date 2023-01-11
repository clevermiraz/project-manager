import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../features/auth/authSlice';

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        if (auth && auth.user && auth.accessToken) {
            dispatch(signin({ user: auth.user, accessToken: auth.accessToken }));
        }
        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
}
