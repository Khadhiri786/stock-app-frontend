import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import kaniniLogo from "../../assets/Kanini-Logo.svg";
import Button from "@mui/material/Button";
import "./Login.css";
import BgImg from "../../assets/textBG.jpg";
import bgText from "../../assets/text.svg";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [emailupdate, setEmailUpdate] = useState({
    emailError: false,
    emailMessage: "",
  });
  const [passwordupdate, setPasswordUpdate] = useState({
    passwordError: false,
    passwordMessage: "",
  });
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);

  useEffect(() => {
    if (email !== null && password !== null && password?.length > 8) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, setEmail, password, setPassword]);

  const loginToApplication = (d: any) => {
    fetch("https://localhost:7007/Authenticate", {
      method: "POST",
      body: JSON.stringify({
        mailId: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.status === 400) {
        alert("Error");
      } else {
        response.json().then((result) => {
          sessionStorage.setItem(
            "token",
            JSON.stringify({
              token: result.token,
            })
          );
          alert("Login Successfully");
          navigate("/dashboard");
        });
      }
    })
    .catch((err)=>{
      alert("Network Error");
    })
  };

  const handleInputPasswordChange = (password: string) => {
    const trimPassword = password?.trim();
    if (trimPassword) {
      if (trimPassword?.length > 8) {
        setPasswordUpdate({ passwordError: false, passwordMessage: "" });
        setPassword(trimPassword);
      } else {
        setPasswordUpdate({
          passwordMessage: "Password must be greater than  8 character",
          passwordError: true,
        });
        setPassword(trimPassword);
      }
    }
  };

  const handleInputEmailChange = (email: string) => {
    const trimEmail = email?.trim();
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const validateEmail = regex.test(trimEmail);
    if (trimEmail) {
      if (validateEmail) {
        setEmailUpdate({ emailError: false, emailMessage: "" });
        setEmail(trimEmail);
      } else {
        setEmailUpdate({ emailError: true, emailMessage: "Invalid Email Id" });
        setEmail(null);
      }
    }
  };

  return (
    <>
      <Box>
        <Grid container lg={12} md={12} >
          <Grid item lg={5} md={6}>
            <img src={BgImg} className="loginImg" alt="background-image"></img>
            <img src={bgText} className="bgText" alt="background-text"></img>
          </Grid>

          <Grid lg={6} style={{ marginTop: "25px" }} md={6}>
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid item xs={3}>
                <img src={kaniniLogo}></img>
              </Grid>
            </Grid>
            <br />

            <Grid container direction="column" alignItems="center">
              <Grid>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  fontSize="32px"
                  fontFamily="Inter"
                  style={{ paddingRight: "100px" }}
                >
                  Sign In
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ marginLeft: "135px" }}
            >
              <Grid>
                <Typography
                  style={{ color: "#4F5B67" }}
                  fontStyle="normal"
                  fontWeight={"400"}
                >
                  {" "}
                  Welcome back! Please enter email id and password
                </Typography>
                <br />
                <Typography
                  style={{ color: "#4F5B67" }}
                  fontStyle="normal"
                  fontWeight={"400"}
                >
                  Email Id
                </Typography>
                <br />
                <TextField
                  autoComplete="off"
                  placeholder="Enter Email Id"
                  style={{ width: "460px" }}
                  onChange={(e) => {
                    handleInputEmailChange(e?.target?.value);
                  }}
                />
                {emailupdate?.emailError && (
                  <Typography
                    style={{ color: "red" }}
                    variant="h6"
                    fontWeight="50"
                  >
                    {emailupdate?.emailMessage}
                  </Typography>
                )}

                <Typography
                  style={{ color: "#4F5B67", marginTop: "35px" }}
                  fontStyle="normal"
                  fontWeight={"400"}
                >
                  Password
                </Typography>
                <TextField
                  autoComplete="off"
                  placeholder="Enter Password"
                  type="password"
                  style={{ width: "460px", marginTop: "25px" }}
                  onChange={(e) => {
                    handleInputPasswordChange(e?.target?.value);
                  }}
                />
                {passwordupdate?.passwordError && (
                  <Typography
                    style={{ color: "red" }}
                    variant="h6"
                    fontWeight="50"
                  >
                    {passwordupdate?.passwordMessage}
                  </Typography>
                )}
                <br />
                <br />
                <br />
                <Button
                  type="submit"
                  disabled={disableButton}
                  variant="contained"
                  style={{ width: "460px", borderRadius: "50px" }}
                  onClick={loginToApplication}
                >
                  SIGN IN
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Login;
