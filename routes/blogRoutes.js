const express = require('express');
const {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, userBlog} = require('../controllers/blogController');


const router = express.Router();


//routes

//get all blogs || GET
router.get('/all-blog', getAllBlogs);

//get single blog by id || GET
router.get('/get-blog/:id', getBlogById);

//get blog by single user id || GET
router.get('/user-blog/:id', userBlog);

//create blog || POST
router.post('/create-blog', createBlog);

//update blog || PUT
router.put('/update-blog/:id', updateBlog);

//delete blog || DELETE
router.delete('/delete-blog/:id', deleteBlog);



module.exports = router;