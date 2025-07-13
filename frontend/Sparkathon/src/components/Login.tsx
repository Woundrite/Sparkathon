import React from 'react'
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  username: string
  password: string
  confirmPassword: string
}


function Login() {

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault();  // optional fallback
    console.log("apple", data);
};

  return (
    
    <div>

        <div className='text-gray-800 text-3xl flex justify-center m-4'>LOG IN</div>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='flex flex-col gap-4'>
           
            <div className='flex flex-col gap-2'>
                <div className='pl-2 text-lg'>email id</div>
                <div className='mx-2 py-2 bg-gray-100 rounded'>
                    <input {...register("email", {required: true})} type='email' />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='pl-2 text-lg'>password</div>
                <div className='mx-2 py-2 bg-gray-100 rounded'>
                    <input {...register("password", {required: true})} type="password" />
                </div>
            </div>

            <div className='flex flex-col items-center'>
                <div>
                    <button type="submit" className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400">
                        Log In
                    </button>
                </div>
                <div>
                    Do not have an account?
                </div>

            </div>

            </div>

        </form>
    </div>
  )
}


export default Login