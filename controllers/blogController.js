const blogModel = require('../models/blogModel');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');

//get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: 'No blogs found'
            });
        }
        return res.status(200).send({
            success: true, 
            BlogCount : blogs.length,
            message: "All Blogs lists",
            blogs,
        })
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success : false,
            message : 'Error while getting blogs',
            e
        })
    }
}

//get single blogs
exports.getBlogById = async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'blog not found with this id',
                e
            })
        };

        return res.status(200).send({
            success: true,
            message : 'single blog found successfully',
            blog
        });

    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success: false,
            message: 'error while getting single blog',
            e
        })
    }
}

//post a blogs
exports.createBlog = async (req, res) => {
    try {
        const {title, description, image, user} = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false, 
                message: "Please provide all fields"
            })
        }
        const existingUser = await userModel.findById(user);
        //validation
        if (!existingUser) {
            return res.status(404).send({
                success : false,
                message : "unable to find user"
            });
        } 
        
        const newBlog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save()
        return res.status(200).send({
            success : true, 
            message: "blog created successfully",
            newBlog
        })
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success: false, 
            message: "Error while creating blog",
            e
        })
    }
}

//update a blog
exports.updateBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, image} = req.body;
        const blog = await blogModel.findById(id, {...req.body}, {new: true});
        return res.status(200).send({
            success: true, 
            message: 'blog updated successfully',
            blog,
        })
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success: false,
            message: "Error updating blog",
            e
        })
    }
}

//delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.findOneAndDelete(req.params._id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "successfully deleted blog"
        })
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success : false,
            message : "Error deleting blog",
            e
        });
    }
}

//get user blog
exports.userBlog = async(req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'blogs not found with this id'
            })
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog
        });

    } catch (e) {
        console.log(e);
        return res.status(400).send({
            success: false,
            message: false,
            e
        });
    }
}