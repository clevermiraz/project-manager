import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute({ children }) {
    const isLoggedIn = useAuth();
    return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
