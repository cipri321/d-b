import React from 'react';
import userRepository from "../http/repositories/userRepository";
import {Box, Stack, TextField} from "@mui/material";

const Profile = () => {
    const [userInfo, setUserInfo] = React.useState({
        user:{}
    });
    React.useEffect(async () => {
        let userInfo = await userRepository.getUserInfo()
        // console.log(userInfo.user)
        setUserInfo(userInfo)
    }, [])
    return (
        <Stack spacing={3}>
            {
                Object.keys(userInfo.user).map((val, idx) =>
                    {
                        if(['username', 'email'].includes(val))
                            return <TextField key={idx} value={userInfo.user[val]} disabled/>
                        return ''
                    }
                )
            }
            {
                userInfo.student_details && Object.keys(userInfo.student_details).map((val, idx) =>
                    <TextField key={idx} value={userInfo.student_details[val]} disabled/>
                )
            }
            {
                userInfo.teacher_details && Object.keys(userInfo.teacher_details).map((val, idx) =>
                    <TextField key={idx} value={userInfo.teacher_details[val]} disabled/>
                )
            }
        </Stack>
    )
}
export default Profile;