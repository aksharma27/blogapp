import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createblog = () => {

    const navigate = useNavigate();

    const id = localStorage.getItem('userId');

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/blog/create-blog', {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            });
            if (data?.success) {
                alert('blog created');
                navigate('/my-blogs');
            }
        } catch (e) {
            console.log(e);
        }
    }

    //input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box marginTop="30px" width={'50%'} border={3} borderRadius={10} padding={3} margin='auto' boxShadow={'10px 10px 20px  #ccc'} display="flex" flexDirection={'column'}>
                    <Typography variant='h2' textAlign={'center'} fontWeight={'bold'} padding={3} color="gray">
                        Create Blog Post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Title</InputLabel>
                    <TextField required name='title' value={inputs.title} onChange={handleChange} variant='outlined' margin='normal' />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Description</InputLabel>
                    <TextField required name='description' value={inputs.description} onChange={handleChange} variant='outlined' margin='normal' />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }}>Image URL</InputLabel>
                    <TextField required name='image' value={inputs.image} onChange={handleChange} variant='outlined' margin='normal' />
                    <Button type='submit' color="primary" variant="contained">post</Button>
                </Box>
            </form>
        </>
    )
}

export default Createblog;
