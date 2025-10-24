import { useEffect } from 'react';
import useAuth from './useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    const user = isAuthenticated.user;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    return <div>{ children(user) }</div>;
}

export default RequireAuth;