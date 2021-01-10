import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Donor from './donor.png';
import Donee from './donee.png';

const IAM = () => {
    let history = useHistory();
    return(
        <Wrapper>
            <Container onClick={() => history.push('/signup/donor')}>
                <SImg src={Donor} title="title"/>
            </Container>
            <Container onClick={() => history.push('/signup/donee')}>
                <SImg src={Donee} title="title"/>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 200px 50px 200px;
`;

const Container = styled.div`
    ${({ theme }) => `
        :hover {
            transform: ${theme.transitions.scale};
        }
        border-radius: ${theme.radius.default};
    `};
`;

const SImg = styled.img`
    width: 500px;
    height: 500px;
    ${({ theme }) => `
        border-radius: ${theme.radius.default};
    `};
`;

export default IAM;