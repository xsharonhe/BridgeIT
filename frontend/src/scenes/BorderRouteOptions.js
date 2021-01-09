import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";

import { OptionCard } from "../components";

const options = [
    { value: "Windsor", label: "Windsor - Ambassador Bridge" },
    { value: "Sarnia", label: "Sarnia" },
    { value: "FortErie", label: "Fort Erie" },
    { value: "Queenston", label: "Queenston" },
    { value: "Lansdowne", label: "Lansdowne" },
    { value: "Prescott", label: "Prescott" },
    { value: "Cornwall", label: "Cornwall" },
    { value: "", label: "All routes" }
  ];

const BorderRouteOptions = ({
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState(
        options[0].value
    );
    const [borderOptions, setBorderOptions] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        setBorderOptions([]);
        axios
            .get(`http://localhost:8000/api/v1/ml/?place=${selectedValue}`)
            .then(res => {
                console.log(res)
                setBorderOptions(res.data.query);
            })
            .catch(err => {
                setError(true);
            })
    }, [selectedValue]);
    return (
        <Container {...props}>
            <SelectHeader>
                <StyledSelect
                    onChange={(e) => {
                        setSelectedValue(e.label);
                    }}
                    placeholder={selectedValue}
                    options={options}
                />
            </SelectHeader>
            <Wrapper>
                {!!error ? <div> Data cannot be fetched</div>
                    : 
                borderOptions.map((borderOption) => (
                    <OptionCard 
                        key={`${borderOption.location}-${borderOption.hour}`}
                        location={borderOption.location}
                        time={borderOption.hour}
                        weekday={borderOption.weekday}
                        hours={Math.round(borderOption.hours * 100) / 100}
                        style={{ margin: '0 20px' }}
                    />
                ))}
            </Wrapper>
        </Container>
    );
}

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: row;
`;
const Container = styled.div`
`;
const StyledSelect = styled(Select)`
    width: 200px;
`;
const SelectHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 80px;
`;
export default BorderRouteOptions;