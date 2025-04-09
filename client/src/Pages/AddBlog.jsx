import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showloading, hideloading } from '../Redux/Feature';

const AddBlog = () => {
    
const navigate = useNavigate();

const dispatch = useDispatch();

    const [title , settitle] = useState();
    const [image , setimage] = useState();
    const [description , setdescription] = useState();

    const auth = JSON.parse(localStorage.getItem('user'));
    const authId = auth.user._id;

    const obj = {title, image, description, user:authId}

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(showloading());
        let addBlog = await fetch('http://localhost:4000/create/blog',{
            method:'post',
            body:JSON.stringify(obj),
            headers:{'Content-Type' : 'application/json'}
        });

        addBlog = await addBlog.json();
        console.log(addBlog)
        dispatch(hideloading());
        navigate('/userblogs')
        
        
    }

  return (
    <div className='w-full'>
        <div className='mx-auto mt-40 p-3 shadow-lg w-[300px] md:w-[400px]'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center font-bold text-xl'>Add Blog</h1>
                <div className='my-3'>
                    <input onChange={(e)=>settitle(e.target.value)} className='border-b p-2 w-full outline-none px-2 my-3 rounded' type="text" placeholder='title' />
                </div>
                <div className='my-3'>
                    <input onChange={(e)=>setimage(e.target.value)} className='border-b p-2 w-full outline-none px-2 my-3 rounded' type="text" placeholder='image url' />
                </div>
                <div className='my-3'>
                    <textarea className='w-full outline-none border my-3 p-3' placeholder='enter description ......' onChange={(e)=>setdescription(e.target.value)} >{description}</textarea>
                </div>

                <button type='submit' className='px-4 py-2 rounded bg-purple-500 text-white'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog