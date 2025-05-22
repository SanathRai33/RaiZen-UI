import React from 'react'
import '../CSS/Register.css'
import { KeyRoundIcon, LucideLockKeyhole, Mail, Phone, User2 } from 'lucide-react';
import { Helmet } from 'react-helmet';

export default function Register() {
    return (
        <div className='Register'>
            <Helmet>
                <title>RaiZen Resgister</title>
                <meta name="description" content='resgister' />
            </Helmet>
            <div className="image">
                <img src="https://cdn.pixabay.com/photo/2020/09/20/04/28/delivery-5585969_1280.jpg" alt="background" />
                <h1>RaiZen</h1>
            </div>
            <div className="form">
                <h1>Create Account</h1>
                <div className="input-fields">
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" />
                    <User2 className='icon' size={20} />
                </div>
                <div className="input-fields">
                    <label htmlFor="Phone">Phone</label>
                    <input type="text" name="phone" />
                    <Phone className='icon' size={20} />
                </div>
                <div className="input-fields">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" />
                    <Mail className='icon' size={20} />
                </div>
                <div className="input-fields">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" />
                    <KeyRoundIcon className='icon' size={20} />
                </div>
                <div className="input-fields">
                    <label htmlFor="Password">Confirm Password</label>
                    <input type="password" name="confirm_password" />
                    <LucideLockKeyhole className='icon' size={20} />
                </div>
                <button>Register</button>
                <p>By creating an account, you agree to RaiZen's <a href="/">Condition of Use</a> and <a href="/">Privacy Notice</a></p>
                <p>Already have an account? <a href="/Login">Login</a></p>
            </div>
        </div>
    )
}
