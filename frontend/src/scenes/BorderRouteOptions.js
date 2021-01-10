import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import axios from "axios";

import { OptionCard } from "../components";

const BorderRouteOptions = ({
    ...props
}) => {
    const [borderOptions, setBorderOptions] = useState([]);
    const [error, setError] = useState(true);
    useEffect(() => {
        setBorderOptions([]);
        axios
            .get(`http://localhost:8000/api/v1/ml/?origins=AnnArbor`)
            .then(res => {
                setBorderOptions(res.data.smallest);
                console.log(res.data.smallest)
            })
            .catch(err => {
                setError(true);
            });
        let timer = setTimeout(() => {
            setError(false);
        }, 20000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <Container {...props}>
            <Helmet><title>BridgeIT | Route</title></Helmet>
            <Wrapper>
                {!!error ? <div> Data is fetching...</div>
                    : 
                borderOptions.map((borderOption) => (
                    <OptionCard 
                        key={`${borderOption.location}-${borderOption.hour}-${borderOption.weekday}`}
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
const SelectHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 80px;
`;
export default BorderRouteOptions;