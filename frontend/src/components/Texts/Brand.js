import styled from "styled-components";

const Brand = ({ children, ...props }) => {
  return <SText {...props}>{children}</SText>;
};

const SText = styled.h1`
  ${({ theme }) => `
    font-family: ${theme.font.header};
    font-size: ${theme.size.large};
    color: ${theme.colors.primary };
    font-weight: bold;
    margin: 0;
    padding: 0;

    span {
      color: ${theme.colors.accent};
    }
    `}
`;

export default Brand;