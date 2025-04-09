
const blogModel = require('../Models/BlogModel');
const UserModel = require('../Models/UserModel');

const mongoose = require('mongoose');

//create blog
const createBlog = async (req,res)=>{
   try {
     const {title, description, image, user} = req.body
     if(!title || !description || !image || !user){
      return res.status(401).send({
        success:false,
        msg:'please provide all the fields'
      })
     }

     const existingUser = await UserModel.findById(user);
     if(!existingUser){
      return res.status(401).send({
        success:false,
        msg:'user not found'
      })
     }
     const blog = new blogModel({title, description, image, user});

      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({session});
     await session.commitTransaction();

      await blog.save();
     return res.status(201).send({ 
      success:true,
      msg:'blog created',
      blog
     })
  
   } catch (error) {
    console.log(error);
    res.status(401).send({
        success:false,
        msg:'something went wrong !',
        error
    })
   }
}

//Get All Blog
const getAllBlogs = async(req,res)=>{
  try {
    const getBlogs = await blogModel.find({});
    res.status(201).send({
      success:true,
      msg:'found success',
      getBlogs
    })
  } catch (error) {
    console.log(error),
    res.status(401).send({
      success:false,
      msg:'something went wrong !',
      error
    })
  }
}

const updateBlog = async(req,res)=>{
  try {
    const id = req.params.id;
    const updateBlog = await blogModel.findByIdAndUpdate({_id:id}, req.body, {new:true});
    res.status(201).send({
      success:true,
      msg:'update success',
      updateBlog
    })
  } catch (error) {
    console.log(error),
    res.status(401).send({
      success:false,
      msg:'something went wrong !'
    })
  }
}

const deleteBlog = async(req,res)=>{
  try {
    const id = req.params.id;
    const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user");
    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();

    
    res.status(201).send({
      success:true,
      msg:'data deleted', 
      deleteBlog
    });
  } catch (error) {
    console.log(error), 
    res.status(401).status({
      success:false,
      msg:'somthing went wrong', 
      error
    })
  }
}

const getSingleUserBlog = async(req,res)=>{
  try {
    const id = req.params.id
     const getuserBlog = await UserModel.findById(id).populate('blogs');
     if(!getuserBlog){
      res.status(401).send({
        success:false,
        msg:'no blogs for this user' 
      })
     }
     return res.status(201).send({
      success:true,
      msg:'blog found',
      getuserBlog
     })
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success:false,
      msg:'something went wrong'
    })
  }
}



module.exports = {createBlog, getAllBlogs, updateBlog, deleteBlog, getSingleUserBlog};