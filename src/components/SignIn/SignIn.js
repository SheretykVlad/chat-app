import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css';
import logo from '../../img/logo.png';
import eye from '../../img/eye.png';
import gmail from '../../img/gmail.png';
import makePasswordVisible from '../../services/makePasswordVisible';
import registerNewUserWithGmail from '../../services/registerNewUserWithGmail';
import loginUser from '../../services/loginUser';

function SignIn() {
    const [visible, setVisible] = useState(false)
    const [emailUser, setEmailUser] = useState('')
    const [passwordUser, setPasswordUser] = useState('')
    const [userAuthenticated, setUserAuthenticated] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.stringify(localStorage.getItem('user')) : null
        if (user) {
            setUserAuthenticated(true)
        }
    }, [])

    async function submitLoginUser(event) {
        event.preventDefault()
        loginUser(emailUser, passwordUser, setUserAuthenticated)
    }

    if (userAuthenticated) {
        return <Redirect to='/chat' />
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
                <form onSubmit={(event) => submitLoginUser(event)}>
                    <div className='signin__input'>
                        <div className='input-block'>
                            <input type='text' placeholder='Email' className='input' value={emailUser} onChange={(event) => setEmailUser(event.target.value)}/>
                        </div> 
                        <div className='input-block'>
                            <input type='password' placeholder='Password' className='input password' value={passwordUser} onChange={(event) => setPasswordUser(event.target.value)}/>
                            <button onClick={() => makePasswordVisible(visible, setVisible)} className='eye-button' type='button'>
                                <img src={eye} alt='' className='eye-image'/>
                            </button>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='button-login'>LOGIN</button>
                    </div>
                    <div className='another-auth'>
                        <span className='another-auth__text'><Link to='/register'>Create Account</Link> Or Sign Up Using</span>
                        <img src={gmail} alt='' className='another-auth__icon' onClick={() => registerNewUserWithGmail(setUserAuthenticated)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;