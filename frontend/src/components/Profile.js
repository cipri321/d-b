import React from 'react';
import userRepository from "../http/repositories/userRepository";
import {Box, Stack, TextField} from "@mui/material";

const Profile = () => {
    const [userInfo, setUserInfo] = React.useState({
        username:'',
        firstName:'',
        lastName:'',
        email:''
    });
    React.useEffect(async () => {
        let userInfo = await userRepository.getUserInfo()
        setUserInfo({
            username:userInfo.username,
            firstName: userInfo.first_name,
            lastName: userInfo.last_name,
            email:userInfo.email

        })
    }, [])
    return (
        <Stack spacing={3}>
            {
                Object.keys(userInfo).map((val, idx) =>
                    <TextField key={idx} value={userInfo[val]} disabled/>
                )
            }
        </Stack>
    )
}
export default Profile;