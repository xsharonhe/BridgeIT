import styled from 'styled-components';

export const Container = ({children, ...props}) => {
    return (
        <SDiv {...props}>
            {children}
        </SDiv>
    );
}

const SDiv = styled.div`
    ${({theme, ...props}) => `
        padding: 3% 10%;
        background-color: ${theme.colors[props.bgColor] || theme.colors.background};
        color: ${theme.colors[props.color] || theme.colors.text};
    `}
`;