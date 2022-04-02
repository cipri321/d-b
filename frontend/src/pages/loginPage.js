import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {loginUser} from "../api/requests";


const fields = [
    {
        label:'username',
        defaultValue: ''
    },
    {
        label:'password',
        defaultValue: ''
    },
]

const LoginPage = (props) => {
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
            loginUser({username:data.username, password:data.password}).then(resp => {
                if(resp.status === 200) {
                    alert('user logged in')
                } else {
                    alert('login failed')
                }
            })
        }
    }

    return (
        <Box sx={{width:'30%'}}>
            <form onSubmit={handleSubmit((data)=>{handleLogin(data)})}>
                <Stack>
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
                    <Button variant={'outlined'} type='submit'>Login</Button>
                </Stack>

            </form>
        </Box>
    )
}
export default LoginPage;