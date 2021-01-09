import styled from "styled-components";
import { Text, Input, Button } from "../";

export const FormPage = styled.div``;

export const FormWrapper = styled.div`
  background-color: #ffffff;
  width: 400px;
  margin: 7em auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
`;

export const SForm = styled.form`
  padding: 8% 10%;
`;

export const FormSpan = styled.span`
  ${({ theme }) => `
        color: ${theme.colors.secondary};
        cursor: pointer;
        &:hover {
            color: ${theme.colors.hover};
        }
    `}
`;

export const FormText = ({ children }) => {
  return (
    <Text
      size="h2"
      font="heading"
      color="primary"
      align="center"
      bold
      style={{ paddingTop: "10%" }}
    >
      {children}
    </Text>
  );
};

export const FormButton = ({ children, ...props }) => {
  return <Button style={{ width: "85%" }} {...props}>{children}</Button>;
};
