import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useCallback } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import useAuth from './auth/useAuth.jsx';

const LoginForm = () => {
    const navigate = useNavigate();
    const [resMsg, setResMsg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(useAuth());

    const { setUID } = useAuth();

    // Function to handle form submission
    const submitFunc = useCallback(async (e) => {
        e.preventDefault();
        const url = '/auth/login';
        const reqBody = {
            username: username,
            password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        const res = await axios.post(url, reqBody, {headers: headers}, {withCredentials: true});

        if(res.data.success) {
            navigate('/');
        }

        setUID(res.data.uid);

        setUsername('');
        setPassword('');
        setResMsg(res.data.message);
}, [navigate, username, password, setUID]);

    return (
        <>
            <form onSubmit={submitFunc}>

                {/* Input username and password */}
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div className="form-group">
                        <input value={username} onChange={e => setUsername(e.target.value)} type="username" className="form-control w-100 my-3" id="user" aria-describedby="userHelp" placeholder="Username" width="50%" margin-bottom="10px" required></input>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div className="form-group">
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control w-100 mb-3" id="pass" placeholder="Password" width="50%" required></input>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <a className="mb-2" href="#">Forgot Password?</a>
                </div>

                {/* Login button */}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="row w-20">
                        <button type="submit" className="btn btn-primary mb-3">Login</button>
                    </div>
                </div>
            </form>
            {/* Sign up button */}
            <div className="d-flex justify-content-center align-items-center">
                <div className="row w-20">
                    <Link to="/signup">
                        <button type="submit" className="btn btn-secondary">Sign up</button>
                    </Link>
                </div>
            </div>
            {/* Display error message */}
            {resMsg == '' ? null : 
            <div className="w-40 d-flex justify-content-center align-items-center">
                <p id="errMsg" className="mt-3 w-40 alert alert-danger">{resMsg}</p>
            </div> }
        </>
    );
}

export default LoginForm;