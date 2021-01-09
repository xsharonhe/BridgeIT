import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text, Input } from "../components";
import {
  FormPage,
  FormWrapper,
  SForm,
  FormSpan,
  FormText,
  FormButton,
} from "../components/Containers/FormStyles";

class SignUp extends React.Component {
  state = {
    group_name: "",
    username: "",
    password: "",
    verify_password: "",
    user_type: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRadio = (e) => {
    this.setState({
      user_type: e.target.name,
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    if (
      this.state.group_name === "" ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.verifyPassword === ""
    ) {
      console.log("one of the input fields is empty");
      alert("Please recheck your details.");
    } else if (this.state.userType === "") {
      console.log("both radio fields are empty");
      alert("Please choose which type of account you would like to make.");
    } else {
      console.log(`sign up button clicked for new ${this.state.userType}`);
    }
  };

  render() {
    return (
      <FormPage>
        <FormWrapper>
          <FormText>Sign Up</FormText>
          <SForm>
            <Input
              name="group_name"
              type="text"
              align="center"
              placeholder="Group Name"
              value={this.state.group_name}
              onChange={this.handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
              required
            />
            <Input
              name="username"
              type="text"
              align="center"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
              required
            />
            <Input
              name="password"
              type="password"
              align="center"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
              required
            />
            <Input
              name="verifyPassword"
              type="password"
              align="center"
              placeholder="Verify Password"
              value={this.state.verifyPassword}
              onChange={this.handleChange}
              style={{ width: "85%", marginBottom: "8%" }}
              required
            />
            <Text>Please select one: </Text>
            <UserType>
              <input
                type="radio"
                id="donor"
                name="donor"
                onChange={this.handleRadio}
              />
              <label htmlFor="donor">Looking to donate</label>
              <br />
              <input
                type="radio"
                id="receiver"
                name="receiver"
                onChange={this.handleRadio}
              />
              <label htmlFor="community">Seeking supplies</label>
              <br />
            </UserType>
            <FormButton onClick={this.handleClick}>Sign Up</FormButton>
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
  }
}

const UserType = styled.div`
  ${({ theme }) => `
    margin-bottom: 5%;
        label {
            font-family: ${theme.font.body};
            margin-bottom: 2%;
        }
    `}
`;

export default SignUp;
