import React from 'react'
import '../CSS/Login.css'
import  { KeyRoundIcon, Mail, User2 } from 'lucide-react';

export default function Login() {
  return (
    <div className='Login'>
        <div className="form">
            <h1>Login</h1>
            <div className="input-fields">
                <label htmlFor="Name">Name</label>
                <input type="text" name="name"/>
                <User2 className='icon' size={20}/>
            </div>
            <div className="input-fields">
                <label htmlFor="Email">Email</label>
                <input type="email" name="email"/>
                <Mail className='icon' size={20}/>
            </div>
            <div className="input-fields">
                <label htmlFor="Password">Password</label>
                <input type="password" name="password"/>
                <KeyRoundIcon className='icon' size={20}/>
            </div>
            <button>Login</button>
            <p>By creating an account, you agree to RaiZen's <a href="/">Condition of Use</a> and <a href="/">Privacy Notice</a></p>
            <p>You don't have account? <a href="/Register">Register</a></p>
        </div>
        <div className="image">
            <img src="https://cdn.pixabay.com/photo/2020/09/20/04/28/delivery-5585969_1280.jpg" alt="background" />
            <h1>RaiZen</h1>
        </div>
    </div>
  )
}
