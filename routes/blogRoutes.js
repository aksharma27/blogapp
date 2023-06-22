const express = require('express');
const {getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog} = require('../controllers/blogController');


const router = express.Router();


//routes

//get all blogs || GET
router.get('/all-blog', getAllBlogs);

//get single blog || GET
router.get('/get-blog/:id', getBlogById);

//create blog || POST
router.post('/create-blog', createBlog);

//update blog || PUT
router.put('/update-blog/:id', updateBlog);

//delete blog || DELETE
router.delete('/delete-blog/:id', deleteBlog);



module.exports = router;