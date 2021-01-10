import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { OptionCard } from "../components";
import Loader from "../components/UI/Loader";

const BorderRouteOptions = ({
    ...props
}) => {
    const [borderOptions, setBorderOptions] = useState([]);
    const [error, setError] = useState(true);
    const [biggest, setBiggest] = useState();
    useEffect(() => {
        setBorderOptions([]);
        axios
            .get(`http://localhost:8000/api/v1/ml/?origins=Albany`)
            .then(res => {
                setBorderOptions(res.data.smallest);
                setBiggest(res.data.biggest[0]);
            })
            .catch(err => {
                setError(true);
            });
        let timer = setTimeout(() => {
            setError(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const getTimeSaved = (time) => {
        return biggest - time;
    };
    
    let history = useHistory();
    return (
        <Container {...props}>
            <Helmet><title>BridgeIT | Route</title></Helmet>
            <Heading style={{ marginLeft: '50px' }}>Choose a route:</Heading> 
            <h2 style={{ marginLeft: '50px' }}>From your address in Albany, New York:</h2> 
            <Wrapper>
                {!!error ? (
                    <div style={{ width: '200px', height: '200px'}}>
                        <Loader /> 
                        <p align="center">Data is fetching...</p>
                    </div>
                )
                    : 
                borderOptions.map((borderOption) => (
                    <BorderWrapper>
                        <OptionCard 
                            key={`${borderOption.location}-${borderOption.hour}-${borderOption.weekday}-border`}
                            location={borderOption.location}
                            time={borderOption.hour}
                            weekday={borderOption.weekday}
                            hours={Math.round(borderOption.hours * 100) / 100}
                            style={{ margin: '0 20px' }}
                            onClick={() => history.push(`/map/${borderOption.location}-${borderOption.hour}-${borderOption.weekday}`)}
                        />
                        <p style={{ marginLeft: '10px', textAlign: 'center' }}>
                            Using our analytics, this route saves you:
                            <br />
                            {Math.round(getTimeSaved(borderOption.hours) * 100) / 100} hours
                        </p>
                    </BorderWrapper>
                ))}
            </Wrapper>
        </Container>
    );
}
const Heading = styled.h1`
    ${({ theme }) => `
        color: ${theme.colors.primary};
    `};
`;
const BorderWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 80vw;
`;
const Container = styled.div`
    width: 80vw;
`;

export default BorderRouteOptions;