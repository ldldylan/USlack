// import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
// import { useDispatch } from "react-redux";
// import "./LoginForm.css";

// function LoginForm() {
//   const dispatch = useDispatch();
//   const [credential, setCredential] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);
//     return dispatch(sessionActions.login({ credential, password }))
//       .catch(async (res) => {
//         let data;
//         try {
//           // .clone() essentially allows you to read the response body twice
//           data = await res.clone().json();
//         } catch {
//           data = await res.text(); // Will hit this case if the server is down
//         }
//         if (data?.errors) setErrors(data.errors);
//         else if (data) setErrors([data]);
//         else setErrors([res.statusText]);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ul>
//         {errors.map(error => <li key={error}>{error}</li>)}
//       </ul>
//       <label>
//         Email
//         <input
//           type="text"
//           value={credential}
//           onChange={(e) => setCredential(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// export default LoginForm;

import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './LoginForm.css';
import slackLogo from "../../assests/images/slack-logo.png"

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password}))
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

    return (
        <div className='login-box'>
            <header className="login-header">
                <NavLink to='/' className="login-logo">
                    <img src={slackLogo} alt="logo" style={{ height:'40px' }}></img>
                    <h2>USlack</h2>
                </NavLink>
                <div className="signup-option"> 
                    <p>New to USlack?</p>
                    <NavLink to={"/signup"} className="signup-link">
                        <p>Create an account</p>
                    </NavLink>
                </div>
            </header>
            <h1>Sign in to USlack</h1>
            <p id='suggestion'>We suggest using the <strong>email address you use at work.</strong></p>
            
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='login-email'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder="name@work-email.com"
                    required
                />
                <input
                    type="password"
                    className='login-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                    />
                <button className='login-button' type="submit">Sign In With Email</button>
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </form>
        </div>
    );
}


export default LoginFormPage;