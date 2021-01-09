import React from 'react';
import styled from 'styled-components';
import { Timer } from '@styled-icons/boxicons-regular/Timer';

export const OptionCard = ({
    location,
    time,
    weekday,
    hours,
    ...props
}) => {
    const getWeekday = () => {
        if(weekday === 1) {
            return "Weekday"
        }
        return "Weekend"
    }
    const getTime = () => {
        if(time === 23) {
            return "11 PM"
        } else if(time === 0) {
            return "12 AM"
        } else {
            return "1AM"
        }
    }
    return (
        <SOptionsCard {...props}>
            <h2>{location}</h2>
            <p>{getWeekday()}</p>
            <p>{getTime()}</p>
            <hr />
            <SContainer>
                <span>
                    <Icon as={Timer} /> {hours}
                </span>
            </SContainer>
        </SOptionsCard>
    );
}

const SOptionsCard = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
        padding: 0.7rem 1.25rem;
        width: 80%;
        font-family: ${theme.font.body};
        cursor: pointer;
        color: ${theme.colors.primary};
        :hover {
            transition: ${theme.transitions.cubicBezier};
            box-shadow: ${theme.boxShadow.topBottom};
            transform: ${theme.transitions.scale};
        }

        h2 {
            font-size: ${theme.size.h2};
            margin: 0;
            padding-bottom: 0.5rem;
        }

        p {
            font-size: ${theme.size.default};
            margin: 0;
        }
    `}
`;

const SContainer = styled.div`
    display: flex;
    justify-content: center;;
`;
const Icon = styled.svg`
    width: 20px;
    height: 20px;
    ${({ theme }) => `
        color: ${theme.colors.primary};
    `};
`;