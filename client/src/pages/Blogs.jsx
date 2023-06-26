import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    //get blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/blog/all-blog');
            if (data?.success) {
                setBlogs(data && data.blogs);
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])
    return (
        <div>
            {blogs && blogs.map(blog => (
                <BlogCard title={blog.title}
                    description={blog.description}
                    image={blog.user.image}
                    username={blog.user.username}
                    time={blog.createAt}
                />
            ))}

        </div>
    )
}

export default Blogs;