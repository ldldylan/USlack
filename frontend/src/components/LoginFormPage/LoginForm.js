import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './LoginForm.css';
import slackLogo from "../../assests/images/slack-logo.png"
import { useHistory } from 'react-router-dom';

function LoginFormPage(){
    const dispatch = useDispatch();
    const histroy = useHistory();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) return <Redirect to="/workspaces" />;

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.user.clone().json();
                } catch {
                    data = await res.user.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }).then(histroy.push('/workspaces'))
    }

    const handleDemo1Login = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'demo1@user.io', password: 'password'}))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.user.clone().json();
                } catch {
                    data = await res.user.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }).then(histroy.push('/workspaces'))
    }

    const handleDemo2Login = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: 'demo2@user.io', password: 'password'}))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.user.clone().json();
                } catch {
                    data = await res.user.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }).then(histroy.push('/workspaces'))
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
            
            <form className='login-form'>
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
                <ul>
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                <button className='login-button' onClick={(e) => handleLogin(e)}>Sign In With Email</button>
                <div className='demo-user-option'>
                    <button className='demo1-button' onClick={(e) => handleDemo1Login(e)}>Sign In As Demo User 1</button>
                    <button className='demo2-button' onClick={(e) => handleDemo2Login(e)}>Sign In As Demo User 2</button>
                </div>
                
            </form>
        </div>
    );
}


export default LoginFormPage;