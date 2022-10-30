//Hello World
import React, { useState } from "react";
import {
  Alert,
  Snackbar,
  Stack,
  Button,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
} from "@mui/material";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { usersState } from "../state";

const LoginForm = styled(Stack)`
  padding: 1em;
  width: 50%;
  margin: auto;
  text-align: "center";
`;
const LoginHeading = styled.h3`
  text-align: center;
  font-weight: 400;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(["", "", ""]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useRecoilState(usersState);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onChangeInput = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    switch (field) {
      case "username":
        setUsername(value);
        setErrors(["", errors[1], errors[2]]);
        break;
      case "password":
        setPassword(value);
        setErrors([errors[0], "", errors[2]]);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setErrors([errors[0], errors[1], ""]);
        break;
      default:
        break;
    }
  };
  const register = () => {
    setErrors(["", "", ""]);
    if (users.findIndex((user) => user.username === username) !== -1) {
      setErrors(["User with same username already exist", "", ""]);
      return;
    }
    if (password === "") {
      setErrors(["", "Password cannot be empty", ""]);
      return;
    }

    if (confirmPassword === "") {
      setErrors(["", "", "Confirm Password cannot be empty"]);
      return;
    }
    if (password !== confirmPassword) {
      setErrors(["", "", "Password(s) should be same."]);
      return;
    }

    setUsers([...users, { username, password }]);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    handleClick();
  };

  return (
    <LoginForm spacing={2}>
      <LoginHeading>Please Register to DOOR STEP</LoginHeading>
      <FormControl error={errors[0] !== ""}>
        <InputLabel htmlFor="username-input">Username</InputLabel>
        <Input
          id="username-input"
          value={username}
          name="username"
          onChange={onChangeInput}
        />
        <FormHelperText>{errors[0]}</FormHelperText>
      </FormControl>
      <FormControl error={errors[1] !== ""}>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          type="password"
          id="password-input"
          value={password}
          name="password"
          onChange={onChangeInput}
        />
        <FormHelperText>{errors[1]}</FormHelperText>
      </FormControl>
      <FormControl error={errors[2] !== ""}>
        <InputLabel htmlFor="confirm-password-input">
          Confirm Password
        </InputLabel>
        <Input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={onChangeInput}
        />
        <FormHelperText>{errors[2]}</FormHelperText>
      </FormControl>

      <div style={{ textAlign: "center" }}>
        <Button
          variant={"contained"}
          color="primary"
          onClick={register}
          style={{ width: "200px" }}
        >
          REGISTER
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User Registered. Please login now!
        </Alert>
      </Snackbar>
    </LoginForm>
  );
};

export default Register;
