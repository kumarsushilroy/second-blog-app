import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showloading, hideloading } from '../Redux/Feature';

const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username , setusername] = useState();
    const [email , setemail] = useState();
    const [password , setpassword] = useState();

    const obj = {username, email, password};

    const handleSubmit = async(e)=>{

        e.preventDefault();
        dispatch(showloading())
       let createUser = await fetch('http://localhost:4000/create/user',{
        method:'post',
        body:JSON.stringify(obj),
        headers:{'Content-Type':'application/json'}
       });
      createUser = await createUser.json();
    //   console.log(createUser);
      dispatch(hideloading());
      navigate('/login')
    }

  return (
    <div className='w-full h-full '>
        <div className='border w-[400px] p-6  mx-auto mt-40'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center font-bold font-mono text-2xl'>Register First</h1>
                <div className='my-3'>
                    <input type="text" onChange={(e)=>setusername(e.target.value)} placeholder='Username' className='w-full  border-b outline-none p-2' />
                </div>

                <div className='my-3'>
                    <input type="text" onChange={(e)=>setemail(e.target.value)} placeholder='Email' className='w-full border-b outline-none p-2' />
                </div>

                <div className='my-3'>
                    <input type="text" onChange={(e)=>setpassword(e.target.value)} placeholder='Password' className='w-full border-b outline-none p-2' />
                </div>

                <button type='submit' className='px-4 py-2 mt-4 bg-purple-500 text-white rounded'>Sign up</button>
            </form>
        </div>
    </div>
  )
}

export default Register