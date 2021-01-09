import styled from "styled-components";
import { StyledIconBase } from "@styled-icons/styled-icon";

export const IconWrapper = styled.div`
  ${({ theme }) => `
    ${StyledIconBase} {
        display: flex;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        color: ${theme.colors.primary};
        height: 40px;
    }
    `}
`;