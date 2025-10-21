import './Login.css';
import SignupForm from './SignupForm.jsx';
import "@fontsource/open-sans";

const Signup = () => {
    return (
        <div className="gradient-background">
        { /* Project X Logo */ }
        <div className='x-logo-container'>
          <div className="x-logo">
            <p className='p-in-x-logo'>P</p>
          </div>
        </div>
        <h1>Project X</h1>
        <h2>Sign up</h2>

        { /* Include a LoginForm component */ }
        <SignupForm/>
        </div>
    )
};

export default Signup;