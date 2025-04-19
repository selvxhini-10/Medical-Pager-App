import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const initialState = {
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState();
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        //wrap name of specific object key in square brackets
        setForm({... form, [e.target.name]: e.target.value}); //everything else remains the same except for one value 
    }
    const handleSubmit = (e) => { //accept event
        e.preventDefault(); //prevent from reloading the page - need for form 
        console.log(form);
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup); //callback function to change the state depending on previous state
    }
  return (
    <div className='auth__form_container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input name="fullName"
                            type="text"
                            placeholder='Full Name'
                            onChange={handleChange}
                            required />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Username</label>
                            <input name="username"
                            type="text"
                            placeholder='Username'
                            onChange={handleChange}
                            required />
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input name="phoneNumber"
                            type="text"
                            placeholder='Phone Number'
                            onChange={handleChange}
                            required />
                        </div>
                    )}
                    {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input name="avatarURL"
                            type="text"
                            placeholder='Avatar URL'
                            onChange={handleChange}
                            required />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input name="password"
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            required />
                        </div>
                        {isSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input name="confirmPassword"
                            type="password"
                            placeholder='Confirm Password'
                            onChange={handleChange}
                            required />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignup ? "Already have an account?" : "Don't have an account yet?"}
                        <span onClick={switchMode}>
                        {isSignup ? ' Sign In' : ' Sign Up'}
                        </span>
                    </p>
                </div>
            </div>

        </div>
        <div className='auth__form-container_image'>
            <img src={signinImage} alt='sign in' />

        </div>
    </div>
  )
}

export default Auth;