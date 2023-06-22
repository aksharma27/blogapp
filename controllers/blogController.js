const blogModel = require('../models/blogModel');

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
        const {title, description, image} = req.body;
        if (!title || !description || !image) {
            return res.status(400).send({
                success: false, 
                message: "Please provide all fields"
            })
        }
        const newBlog = new blogModel({title, description, image})
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
        await blogModel.findOneAndDelete(req.params.id);
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