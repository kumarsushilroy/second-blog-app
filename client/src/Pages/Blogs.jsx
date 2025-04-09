import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';

const Blogs = () => {

  const [blogs, setblogs] = useState([])

  // const user = JSON.parse(localStorage.getItem(user));
  // console.log(user)

  const fetchBlogs = async()=>{
     let fetchData = await fetch('http://localhost:4000/get/allblogs',{
      method:'get',
      headers:{'Content-Type':'application/json'}
     });
     fetchData = await fetchData.json();
     console.log(fetchData)
     setblogs(fetchData.getBlogs)
     
     
  }

   const id = JSON.parse(localStorage.getItem('user'))
   const userId = id.user._id;
   

  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div>
      <h1 className='text-center font-bold'>{blogs.length} Blogs Availabe</h1>
        <div className='grid grid-cols-3 gap-3 p-3'>
          {
            blogs && blogs.map((item,i)=>{
              return(
                <BlogCard 
                title={item.title}
                 description={item.description}
                  image={item.image}
                  blogId={item._id}
                  isUser= {userId === item.user}
               />
              )
            })
          }
        </div>
    </div>
  )
}

export default Blogs