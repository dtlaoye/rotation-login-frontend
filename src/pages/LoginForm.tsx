import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`;

function LoginForm() {
  const [registeredState, setRegisteredState] = useState(false);
  const [incorrectCreds, setIncorrectCreds] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleToggle = () => {
    setRegisteredState((prev) => !prev);
  };

  useEffect(() => {
    console.log("Flag is now", incorrectCreds);
  }, [incorrectCreds]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      if (data.login) {
        alert(`Welcome back, ${data.login.username}!`);
        // Handle successful login (e.g., store token/session)
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, password } });
      alert(`User registered successfully: ${data.register.username}`);
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="app">
      <div className={`cont ${registeredState ? "s--signup" : ""}`}>
        <div className="form sign-in">
          <img className="logo" src="./src/images/logo192.png" />
          <h2>Welcome back</h2>
          <label>
            <span>Username</span>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          {incorrectCreds && (
            <p className="incorrect-msg">
              Incorrect username or password. Try again.
            </p>
          )}
          <button type="button" className="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and discover a great amount of new opportunities!</p>
            </div>
            <div className="img__text m--in">
              <h2>One of us?</h2>
              <p>
                If you already have an account, just sign in. We've missed you!
              </p>
            </div>
            <div className="img__btn" onClick={handleToggle}>
              <span className="m--up">Register</span>
              <span className="m--in">Login</span>
            </div>
          </div>
          <div className="form sign-up">
            <img className="logo" src="./src/images/logo192.png" />
            <h2>Time to feel like home</h2>
            <label>
              <span>Username</span>
              <input type="text" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <button type="button" className="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
