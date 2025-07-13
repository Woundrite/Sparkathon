import React from 'react'
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { useState } from 'react'
import { form } from '@heroui/react';


function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const onSubmit = async () => {
        let username = formData.username;
        let password = formData.password;
        
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                window.location.href = '/'; // Redirect to home page on successful login
                // You can store the token in localStorage or handle it as needed
                localStorage.setItem('token', data.token);
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }

  return (
    
    <div>

        <div className='text-gray-800 text-3xl flex justify-center m-4'>LOG IN</div>

        <div>

            <div className='flex flex-col gap-4'>
           
            <div className='flex flex-col gap-2'>
                <div className='pl-2 text-lg'>username</div>
                <div className='mx-2 py-2 bg-gray-100 rounded'>
                          <input required placeholder='username' className='usernameInput'
                              onChange={ (event: any) => {
                                  setFormData({
                                  ...formData,
                                  username: (event.target as HTMLInputElement).value
                            })}} 
                            />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='pl-2 text-lg'>password</div>
                <div className='mx-2 py-2 bg-gray-100 rounded'>
                          <input required placeholder='password' type="password" className="passwordInput"
                              onChange={(event: React.ChangeEvent) => {
                                  setFormData({
                                ...formData,
                                password: (event.target as HTMLInputElement).value
                            })}}
                          />
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div>
                    <button onClick={onSubmit} className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400">
                        Log In
                    </button>
                </div>
                <div>
                    Do not have an account?
                </div>

            </div>

            </div>

        </div>
    </div>
  )
}


export default Login