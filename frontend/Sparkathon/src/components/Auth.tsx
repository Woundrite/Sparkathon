// import React from 'react'
// import { useForm } from "react-hook-form"
// import type { SubmitHandler } from "react-hook-form"

// type Inputs = {
//   email: string
//   username: string
//   password: string
//   confirmPassword: string
// }

import React from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = (data: Inputs) => {
    console.log('✅ Form submitted!', data)
    alert('Form submitted')
  }

  const onInvalid = (errors: any) => {
    console.log('⛔ Validation errors:', errors)
  }

  return (
    <div>
      <div className="text-gray-800 text-3xl flex justify-center m-4">SIGN UP</div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div className="flex flex-col gap-4">

          <input {...register('email', { required: true })} placeholder="Email" />
          {errors.email && <span className="text-red-500">Email is required</span>}

          <input {...register('username', { required: true })} placeholder="Username" />
          {errors.username && <span className="text-red-500">Username is required</span>}

          <input {...register('password', { required: true })} type="password" placeholder="Password" />
          {errors.password && <span className="text-red-500">Password is required</span>}

          <input {...register('confirmPassword', { required: true })} type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Auth




// function Auth() {

//     const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     } = useForm<Inputs>()
    
//     const onSubmit: SubmitHandler<Inputs> = (data, event) => {
//     event?.preventDefault();  // optional fallback
//     console.log("apple", data);
// };

//   return (
    
//     <div>

//         <div className='text-gray-800 text-3xl flex justify-center m-4'>SIGN UP</div>

//         <form onSubmit={handleSubmit(onSubmit)}>

//             <div className='flex flex-col gap-4'>
           
//             <div className='flex flex-col gap-2'>
//                 <div className='pl-2 text-lg'>email id</div>
//                 <div className='mx-2 py-2 bg-gray-100 rounded'>
//                     <input {...register("email", {required: true})} type='email' />
//                 </div>
//             </div>

//             <div className='flex flex-col gap-2'>
//                 <div className='pl-2 text-lg'>username</div>
//                 <div className='mx-2 py-2 bg-gray-100 rounded'>
//                     <input {...register("username", { required: true, maxLength: {value:20, message:'username too long'} })} />
//                 </div>
//             </div>
//                 {/* {errors.password && <span>This field is required</span>} */}
            
//             <div className='flex flex-col gap-2'>
//                 <div className='pl-2 text-lg'>password</div>
//                 <div className='mx-2 py-2 bg-gray-100 rounded'>
//                     <input {...register("password", {required: true})} type="password" />
//                 </div>
//             </div>

//             <div className='flex flex-col gap-2'>
//                 <div className='pl-2 text-lg'>confirm password</div>
//                 <div className='mx-2 py-2 bg-gray-100 rounded'>
//                     <input {...register("confirmPassword", {required: true})} type="password" />
//                 </div>
//             </div>

//             <div className='flex flex-col items-center'>
//                 <div>
//                     <button className="px-2 py-1 text-gray-500 text-xl rounded-lg border-gary-500 border-1 active:bg-gray-400 active:text-white hover:bg-gray-300 hover:text-white cursor-pointer hover:border-gray-400">
//                         <input type="submit" />
// 		            </button>
//                 </div>
//                 <div>
//                     Already have an account?
//                 </div>

//             </div>

//             </div>

//         </form>
//     </div>
//   )
// }


// export default Auth