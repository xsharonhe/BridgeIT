import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Text, Input } from "../components";
import {
  FormPage,
  FormWrapper,
  SForm,
  FormSpan,
  FormText,
  FormButton,
} from "../components/Containers/FormStyles";
import { signUp } from "../store/actions/authActions";
import Cookies from "js-cookie";

const SignUp = ({ signUp, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    group_name: "",
    username: "",
    password: "",
    verify_password: "",
    phone: "",
    address: "",
    user_type: "",
  });

  const [newAccount, setNewAccount] = useState(false);

  const { group_name, username, password, verify_password, phone, address, user_type } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRadio = (e) =>
    setFormData({ ...formData, user_type: e.target.name });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === verify_password) {
      const token = Cookies.get("csrftoken");
      signUp(username, password, verify_password, group_name, phone, address, user_type, token);
      setNewAccount(true);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else if (newAccount) {
    return <Redirect to="/signin" />;
  }

  return (
    <FormPage>
      <Helmet>
        <title>BridgeIT | Sign Up</title>
      </Helmet>
      <FormWrapper>
        <FormText>Sign Up</FormText>
        <SForm>
          <Input
            name="group_name"
            type="text"
            align="center"
            placeholder="Group Name"
            value={group_name}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Input
            name="phone"
            type="text"
            align="center"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Input
            name="address"
            type="text"
            align="center"
            placeholder="Address"
            value={address}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Input
            name="username"
            type="text"
            align="center"
            placeholder="Username"
            value={username}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Input
            name="password"
            type="password"
            align="center"
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Input
            name="verify_password"
            type="password"
            align="center"
            placeholder="Verify Password"
            value={verify_password}
            onChange={(e) => handleChange(e)}
            style={{ width: "85%", marginBottom: "8%" }}
            required
          />
          <Text>Please select one: </Text>
          <UserType>
            <input
              type="radio"
              id="donor"
              name="donor"
              onChange={(e) => handleRadio(e)}
            />
            <label htmlFor="donor">Looking to donate</label>
            <br />
            <input
              type="radio"
              id="receiver"
              name="receiver"
              onChange={(e) => handleRadio(e)}
            />
            <label htmlFor="community">Seeking supplies</label>
            <br />
          </UserType>
          <FormButton onClick={(e) => handleSubmit(e)}>Sign Up</FormButton>
          <Text align="center" style={{ paddingTop: "5%" }}>
            Already have an account?
            <Link to="/signin">
              <FormSpan> Sign in!</FormSpan>
            </Link>
          </Text>
        </SForm>
      </FormWrapper>
    </FormPage>
  );
};

const UserType = styled.div`
  ${({ theme }) => `
    margin-bottom: 5%;
        label {
            font-family: ${theme.font.body};
            margin-bottom: 2%;
        }
    `}
`;

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signUp })(SignUp);
