import React from 'react';

const EnrollmentPage = () => {
    const [enrollment, setEnrollment] = React.useState([
        {id: 1, student_id: 1, year_of_study_id: 1},
        {id: 2, student_id: 2, year_of_study_id: 1},
        {id: 3, student_id: 3, year_of_study_id: 2}
    ]);
    const [student_id, setStudent_id] = React.useState('');
    const [year_of_study_id, SetYear_of_study_id] = React.useState('');
    return (
        <>
        </>
    )
}
export default EnrollmentPage;