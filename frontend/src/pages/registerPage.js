import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import userRepository from "../http/repositories/userRepository";


const fields = [
    {
        label:'username',
        defaultValue: ''
    },
    {
        label:'password',
        defaultValue: ''
    },
    {
        label:'email',
        defaultValue:''
    },
    {
        label:'first_name',
        defaultValue:''
    },
    {
        label:'last_name',
        defaultValue:''
    }
]

const RegisterPage = (props) => {
    const { handleSubmit, reset, setValue, control } = useForm();

    const validateData = (data) => {
        let err=''
        if(!data.username) {
            err+='username should not be empty'
        }
        if(!data.password) {
            err+='password should not be empty'
        }
        return err
    }

    const handleLogin = (data) => {
        const error=validateData(data)
        if(error) {
            alert(error)
        }else {
            userRepository.registerUser(data.username, data.password, data.email, data.first_name, data.last_name).then(resp => {
                console.log(resp)
                if(resp)
                    alert('User registered')
                else
                    alert("There was an error while registering")
            })
        }
    }

    return (
        <Stack spacing={4} justifyContent={'center'} alignItems={'center'}>
            <Typography>
                Register
            </Typography>
            <form onSubmit={handleSubmit((data)=>{handleLogin(data)})}>
                <Stack spacing={2}>
                    {fields.map((value, idx) =>
                        <Controller
                            key={idx}
                            render={({ field }) => {
                                return (
                                    <TextField label={value.label} {...field} />
                                )
                            }}

                            name={value.label}
                            control={control}
                        />
                    )}
                    <Button variant={'outlined'} type='submit'>Register</Button>
                </Stack>

            </form>
        </Stack>
    )
}
export default RegisterPage;