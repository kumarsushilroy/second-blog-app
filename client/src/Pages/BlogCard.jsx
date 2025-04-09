import React from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { showloading, hideloading } from '../Redux/Feature';
import { useNavigate } from 'react-router-dom';


const BlogCard = ({title, description, image, blogId, isUser}) => {

const dispatch = useDispatch();
const navigate = useNavigate();

  // const deleteBlog = async(id)=>{
  //   dispatch(showloading())
  //     let dlt = await fetch(`http://localhost:4000/delete/blog/${id}`, {
  //       method:'delete',
  //       headers:{'Content-Type':'application/json'}
  //     });

  //     dlt = await dlt.json();
  //     dispatch(hideloading());
  //     navigate('/')

  // }

  return (

    <div className='border shadow-md p-3 rounded'>
      
        <div className='flex items-center justify-between'>
            <h1>TITLE: {title}</h1>
            {/* {
              isUser && <div className='flex items-center gap-3'>
                <button><AiFillEdit className='text-green-500'  size={20}/></button>
                <button><AiFillDelete className='text-red-500' size={20} /></button>
                 </div>
            } */}
        </div>
        <img className='w-full h-[200px] object-cover' src={image} alt="" />
        <div>
            <h2>DESC: {description}</h2>
        </div>
    </div>
  )
}

export default BlogCard