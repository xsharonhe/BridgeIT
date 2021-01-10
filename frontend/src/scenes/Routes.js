import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Map from './Map';
import Loader from "../components/UI/Loader";

const Routes = ({
    match
}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [])
    const split = match.params.id.split("-")
    const border = split[0]
    const hour = split[1]
    const weekday = split[2]
    const getLongLat = (border) => {
        switch(border) {
            case 'Sarnia':
                return {
                    "lat": 44.347,
                    "lon": -75.983
                }
            case 'Lansdowne': {
                return {
                    "lat": 44.347,
                    "lon": -75.983,
                }
            }
        }
    }
    return (
        <div style={{ margin: 'auto' }}>
        {loading ? (
            <div style={{ margin: 'auto', width: '200px', height: '200px'}}>
                <Loader /> 
                <p align="center">Data is fetching...</p>
            </div>
        ) : (
            <div>
                <Map 
                    id={match.params.id}
                    position={getLongLat(border)}
                />
                <Wrapper>
                    <Heading>
                    From A (Albany, New York) to E (Wasauksing First Nation Reserve).
                    </Heading>
                    <h2> We are currently on route to your destination. </h2>
                    <h3> Estimated Time of Delivery: January 11th, 9AM EST</h3>
                    <p> (B): Lansdowne (reached) </p> 
                    <p> (C): Parry Sound (en route) </p> 
                    <p> (D): Oastler Lake Provincial Park (en route) </p> 
                    <p> (E): Wasauksing First Nation Reserve (en route) </p> 
                </Wrapper>
            </div>
        )}
        </div>
    )
}

const Wrapper = styled.div`
    padding: 20px 300px 50px 300px;
`;
const Heading = styled.h1`
    ${({ theme }) => `
        color: ${theme.colors.primary};
    `};
`;
export default Routes;