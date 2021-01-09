import React from "react";
import styled from "styled-components";

export const Button = ({ isInverted, children, ...props }) => {
  return (
    <SButton isInverted={isInverted} {...props}>
      {children}
    </SButton>
  );
};

const SButton = styled.button`
  ${({ theme, isInverted, ...props }) => `
        color: ${ isInverted ? `${theme.colors.primary}` : `${theme.colors.background}` };
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
        font-size: ${theme.size.default};
        font-family: ${theme.font.header};
        text-decoration: none;
        cursor: pointer;
        padding: 0.7rem 1.25rem;
        transition: ${theme.transitions.cubicBezier};
        background-color: ${
          isInverted ? `${theme.colors.background}` : `${theme.colors.primary}`
        };
        &:focus,
        &:active,
        &:hover {
            background-color: ${
              isInverted ? `${theme.colors.primaryO}` : `${theme.colors.hover}`
            };
            outline: none;
        }
        &:after {
            display: none !important;
        }
    `};
`;
