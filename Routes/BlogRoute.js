
const express = require('express');
const { createBlog, getAllBlogs, updateBlog, deleteBlog, getSingleUserBlog } = require('../Controllers/BlogController');

const router = express.Router();

//CREATE BLOG ROUTE
router.route('/create/blog').post(createBlog);  

//GET ALL BLOGS
router.route('/get/allblogs').get(getAllBlogs); 

//UPDATE BLOGS
router.route('/update/blog/:id').put(updateBlog); 

//DELETE BLOGS
router.route('/delete/blog/:id').delete(deleteBlog); 

router.route('/get/userblog/:id').get(getSingleUserBlog);


module.exports = router;
 
