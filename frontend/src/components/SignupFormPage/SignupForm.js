import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import slackLogo from "../../assests/images/slack-logo.png"

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, password }))
            .catch(async (res) => {
            let data;
            try {
            // .clone() essentially allows you to read the response body twice
            data = await res.clone().json();
            } catch {
            data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="signup-box"> 
            <header className="signup-header">
                <NavLink to='/' className="signup-logo">
                    <img src={slackLogo} alt="logo" style={{ height:'40px' }}></img>
                    <h2>USlack</h2>
                </NavLink>
            </header>
            <h1>First, enter your email</h1>
            <p>We suggest using the <strong>email address you use at work.</strong></p>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                type="text"
                className="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work-email.com"
                required
                />
                {/* <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='display name'
                required  
                /> */}
                <input
                type="password"
                className="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                />
                <input
                type="password"
                className="signup-comfirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="comfirm password"
                required
                />
                <button className="signup-button" type="submit">Sign Up</button>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </form>
            <div className="login-option">
                <p>Already using USlack?</p>
                <NavLink to={"/login"} className="login-link">
                    <p >Sign in to an existing workspace</p>
                </NavLink>
            </div>
        </div>
    );
}

export default SignupFormPage;