import React from "react";
import styled from "styled-components";

import Map from './Map';

const Routes = ({
    match
}) => {
    return (
        <Map id={match.params.id}/>
    )
}

export default Routes;