import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { signIn } from "../store/actions/authActions";
import { Text, Input } from "../components";
import {
  FormPage,
  FormWrapper,
  SForm,
  FormSpan,
  FormText,
  FormButton,
} from "../components/Containers/FormStyles";
import Cookies from 'js-cookie';

const SignIn = ({ signIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('csrftoken');
    signIn(username, password, token);
  };
  console.log(isAuthenticated)

  if (isAuthenticated) {
    if(username === "wasauksing") {
      return <Redirect to="/dashboard/donee" />;
    } else if (username === "bridgeit") {
      return <Redirect to="dashboard/donor" />
    }
    return <Redirect to="dashboard/donor" />
  }
    else {
    return (
      <FormPage>
        <Helmet>
          <title>BridgeIT | Sign In</title>
        </Helmet>
        <FormWrapper>
          <FormText>Sign In</FormText>
          <SForm>
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
            <FormButton onClick={(e) => handleSubmit(e)}>Sign In</FormButton>
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(SignIn);
