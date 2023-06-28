import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {

    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`https://blogapp-ri60.onrender.com/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);

    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => {
                    <BlogCard
                        id={blog._id}
                        isUser={true}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.username}
                        time={blog.createdAt}
                    />
                })
            ) : (
                <h1>You haven't created a blog yet</h1>
            )}
        </div>
    )
}

export default UserBlogs;