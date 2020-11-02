import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import logo from './img/logo.png';
import eye from './img/eye.png';
import gmail from './img/gmail.png';

function SignIn({makeAuthByGoogle, onLogin}) {
    const [visible, setVisible] = useState(false)
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    function makePasswordVisible() {
        let passwordInput = document.querySelector('.password')
        if (!visible) {
            passwordInput.setAttribute('type', 'text')
            setVisible(true)
        } else {
            passwordInput.setAttribute('type', 'password')
            setVisible(false)
        }
    }

    function createUserByLogin() {
        if (loginValue.trim() && passwordValue.trim()) {
            onLogin(loginValue, passwordValue)
        }
    }

    return(
        <div className='container'>
            <div className='signin'>
                <div className='signin__header'>
                    <h1 className='header'>Welcome to Chat APP</h1>
                </div>
                <div className='signin__logo'>
                    <img src={logo} alt='' className='logo'/>
                </div>
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className='signin__input'>
                        <div className='input-block'>
                            <input type='text' placeholder='Email or username' className='input' value={loginValue} onChange={(event) => setLoginValue(event.target.value)}/>
                        </div> 
                        <div className='input-block'>
                            <input type='password' placeholder='Password' className='input password' value={passwordValue} onChange={(event) => setPasswordValue(event.target.value)}/>
                            <button onClick={() => makePasswordVisible()} className='eye-button'>
                                <img src={eye} alt='' className='eye-image'/>
                            </button>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='button-login' onClick={() => createUserByLogin()}>LOGIN</button>
                    </div>
                    <div className='another-auth'>
                        <span className='another-auth__text'>Or Sign Up Using</span>
                        <img src={gmail} alt='' className='another-auth__icon' onClick={() => {makeAuthByGoogle()}}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

SignIn.propTypes = {
    makeAuthByGoogle: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
}

export default SignIn;