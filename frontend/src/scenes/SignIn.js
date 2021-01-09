import React from "react";
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

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();

    if (this.state.username === "" || this.state.password === "") {
      console.log("one of the input fields is empty");
      alert("Please recheck your credentials.");
    } else {
      console.log(this.state.username, this.state.password);
      console.log("sign in button clicked");
    }
  };

  render() {
    return (
      <FormPage>
        <FormWrapper>
          <FormText>Sign In</FormText>
          <SForm>
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
            <FormButton onClick={this.handleClick}>Sign In</FormButton>
            <Text align="center" style={{ paddingTop: "5%" }}>
              Don't have an account?{" "}
              <Link to="/signup">
                <FormSpan>Sign up!</FormSpan>
              </Link>
            </Text>
          </SForm>
        </FormWrapper>
      </FormPage>
    );
  }
}

export default SignIn;
