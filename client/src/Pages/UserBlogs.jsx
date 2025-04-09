import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';

const UserBlogs = () => {
    
    const auth = JSON.parse(localStorage.getItem('user'))
    const userId = auth.user._id;
    
   const [alluserBlog , setalluserBlog] = useState([])

    const userBlog = async()=>{
        let blog = await fetch(`http://localhost:4000/get/userblog/${userId}`,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        });
        blog = await blog.json();
        setalluserBlog(blog.getuserBlog.blogs)
        console.log(alluserBlog)
        
        
    }

    useEffect(()=>{
   userBlog();
    },[])


  return (
    <div>
      <div className='grid grid-cols-3 gap-3 p-3'>
        {
            alluserBlog.length == 0 ? <p className='text-red-500 text-center font-bold text-xl'>No Blogs Available</p>
            
            : alluserBlog.map((item,i)=>{
                return(
                    <BlogCard 
                    title={item.title}
                     description={item.description}
                      image={item.image} 
                      blogId= {item._id}
                      isUser={true}
                      />
                )
            })
        }
      </div>
    </div>
  )
}

export default UserBlogs