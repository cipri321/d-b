import axiosInstance from '../http/axiosInstance'
import TokenStorage from '../utils/tokenUtils'
import tokenUtils from "../utils/tokenUtils";

export const enrolStudent = async (payload) => {
    return await axiosInstance.post('/ainfo/student/enroll', {
        "year_of_study":payload.year_of_study
    })
}

export const getYearsOfStudy = async (payload) => {
    let res = await axiosInstance.get('/ainfo/student/years_of_study')
    return JSON.parse(res.data)
}
export const getCurriculum = async (payload) => {
    let res = await axiosInstance.get('ainfo/student/curriculum',
        {params: {
            year_of_study_id:payload.year_of_study_id
            }})
    return JSON.parse(res.data)
}

export const getStudentGrades = async (payload) => {
    let res =  await axiosInstance.get('/ainfo/student/grades', {
        params: {
            year_of_study_id: payload.year_of_study_id
        }
    })
    return JSON.parse(res.data)
}