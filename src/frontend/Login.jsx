import './Login.css';
import LoginForm from './LoginForm.jsx';
import "@fontsource/open-sans";

const Login = () => {
    return (
        <div className="gradient-background">
        { /* Project X Logo */ }
        <div className='x-logo-container'>
          <div className="x-logo">
            <p className='p-in-x-logo'>P</p>
          </div>
        </div>
        <h1>Project X</h1>
        <p id="tagline">The app for people who want more from life</p>

        { /* Include a LoginForm component */ }
        <LoginForm/>
        </div>
    )
};

export default Login;