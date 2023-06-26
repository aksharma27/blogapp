import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handlgeChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(inputs);
        try {
            const { data } = await axios.post('/api/v1/users/register', { username: inputs.name, email: inputs.email, password: inputs.password })
            if (data.success) {
                alert('User registration successful')
                navigate('/login');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box maxWidth={450} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} margin='auto' marginTop={5} boxShadow='10px 10px 20px #ccc' padding={3} borderRadius={5}>
                    <Typography variant="h4"
                        padding={3}
                        textAlign='center'
                        textTransform={'uppercase'}
                    >
                        Register
                    </Typography>
                    <TextField placeholder='name' name='name'
                        value={inputs.name}
                        onChange={handlgeChange}
                        margin='normal'
                        type={'text'}
                        required
                    />
                    <TextField placeholder='email' name='email'
                        value={inputs.email}
                        onChange={handlgeChange}
                        margin='normal'
                        type={'email'}
                        required
                    />
                    <TextField placeholder='password' name='password'
                        value={inputs.password}
                        onChange={handlgeChange}
                        margin='normal'
                        type={'password'}
                        required
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Submit</Button>
                    <Button onClick={() => navigate('/login')}
                        type='submit'
                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Already Registerd? Please Login</Button>
                </Box>
            </form>
        </>
    )
}

export default Register
