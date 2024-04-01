import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result)
                navigate('/login');
            })
            .catch(err => console.log(err))
    };



    return (
        <div className='d-flex justify-content-center align-items-center bg-success vh-100'>
            <div className='bg-black p-3 rounded w-25 text-white'>
                <h2>Sign-Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <br />
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-2'
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-2'
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>

                        <input
                            type="password"
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-2'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-2'>
                        Register
                    </button>
                    <p className='pt-2 text-decoration-underline'>already Have an Account</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-2 text-decoration-none'>
                        Sign In
                    </Link>
                </form>
            </div>
        </div>
    )
}
