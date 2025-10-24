import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    let navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const [resMsg, setResMsg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    // Function to handle form submission
    const submitFunc = async (e) => {
        e.preventDefault();
        const url = `${API_BASE}/auth/signup`;
        const reqBody = {
            username: username,
            password: password,
            email: email
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        const res = await axios.post(url, reqBody, {headers: headers}, {withCredentials: false});
        
        setUsername('');
        setPassword('');
        setEmail('');
        if(res.data.success) {
            setSuccess(res.data.success);
            navigate('/login');
        }
        setResMsg(res.data.message);
    }

    return (
        <>
            <form onSubmit={submitFunc}>

                {/* Input username, password, and email */}
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
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div className="form-group">
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control w-100 mb-3" id="email" placeholder="email@example.com" width="50%" required></input>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/login">
                        <p className="mb-3" href="#">Already have an account? Log in</p>
                    </Link>
                </div>

                {/* Sign up button */}
                <div className="d-flex mt-3 justify-content-center align-items-center">
                    <div className="row w-20">
                        <button type="submit" className="btn btn-secondary">Sign up</button>
                    </div>
                </div>
            </form>
            
            {/* Display error message */}
            {resMsg == '' ? null : success ?
            <div className="w-40 d-flex justify-content-center align-items-center">
                <p id="errMsg" className="mt-3 w-40 alert alert-success">{resMsg}</p>
            </div> :
            <div className="w-40 d-flex justify-content-center align-items-center">

                <p id="errMsg" className="mt-3 w-40 alert alert-danger">{resMsg}</p>
            </div> }
        </>
    );
}

export default SignupForm;