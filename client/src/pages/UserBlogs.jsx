import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {

    const { blog, setBlogs } = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`http://localhost:4000/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, [])

    return (
        <div>
            {blog?.map((blog) => {
                <BlogCard
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.username}
                    time={blog.createdAt}
                />
            })}
        </div>
    )
}

export default UserBlogs
