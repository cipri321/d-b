import React from 'react';
import {getYearsOfStudy} from "../http/api";
import Select from "react-select";

const YearSelector = (props) => {
    const [years, setYears] = React.useState([])

    React.useEffect(async ()=> {
        let newYears = await getYearsOfStudy()
        console.log(newYears)
        setYears(newYears)
    },[])

    return (
        <>
            <Select
                options={years.map((val, idx) => {return {value:val.id, label:val.faculty_id_id +' '+ val.name}})}
                onChange={props.onChange}
            />
        </>
    )
}
export default YearSelector;