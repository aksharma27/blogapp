import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
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
            const { data } = await axios.post('https://blogapp-ri60.onrender.com/api/v1/users/login', { email: inputs.email, password: inputs.password })
            if (data.success) {
                localStorage.setItem('userId', data?.user._id);
                dispatch(authActions.login());
                alert('User login successful')
                navigate('/');
            }
        } catch (e) {
            console.log(e)
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
                        Login
                    </Typography>

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
                    <Button onClick={() => navigate('/register')}
                        type='submit'
                        color='primary'
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >Not a user ? Please Register</Button>
                </Box>
            </form>
        </>
    )
}

export default Login
