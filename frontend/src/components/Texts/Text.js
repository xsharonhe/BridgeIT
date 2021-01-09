import styled from "styled-components";

export const Text = ({ children, ...props }) => {
  return <SText {...props}>{children}</SText>;
};

const SText = styled.h3`
  ${({ theme, ...props }) => `
    font-family: ${theme.font[props.font] || theme.font.caption};
    font-size: ${theme.size[props.size] || '1rem' };
    text-align: ${props.align || 'left' };
    color: ${theme.colors[props.color] || theme.colors.primary };
    margin: 0;
    padding: 0;
    font-weight: ${props.bold ? 'bold' : 'normal'}
    `}
`;