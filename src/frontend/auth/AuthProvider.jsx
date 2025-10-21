import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';


const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({ user: null, authenticated: false });
    const [user, setUser] = useState();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post('/auth/checkauth', {
                    withCredentials: true, // Include cookies
                }, {headers: {'authorization': `Bearer ${auth}`}});
                setAuth(response.data.accessToken);
                setUser(response.data.user);
            } catch {
                setAuth(null);
                navigate('/login');
            }
        }
        checkAuth();
    }, [auth, navigate]);

    useLayoutEffect(() => {
        const apiInterceptor = axios.interceptors.response.use((config) => {
            config.headers['Authorization'] = !config._retry && auth? `Bearer ${auth}` : config.headers['Authorization'];
            return config;
        });
        return () => {
            axios.interceptors.response.eject(apiInterceptor);
        };
    }, [auth]);

    useLayoutEffect(() => {
        const refreshInterceptor = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await axios.post('/auth/refresh', {
                            withCredentials: true,
                        });
                        const res = await response.data;
                        setAuth(res.data.accessToken);
                        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                        originalRequest._retry = true;
                        return axios(originalRequest);
                    } catch {
                        setAuth(null);
                        console.log('No refresh token');
                        navigate('/login');
                    }
                }
                return Promise.reject(error);
            },
        );
        return () => {
            axios.interceptors.response.eject(refreshInterceptor);
        };
    }, [navigate]);


  return (
    <AuthContext.Provider value={{ auth, setAuth , user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;