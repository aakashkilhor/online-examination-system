import { useState } from "react";
import myImage from "../assets/myMage.png"
import { Container, TextField,  InputAdornment, IconButton, Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const SignupForm : React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    // Send login data to server
    axios
      .post("http://localhost:3000/signin", {
        name:username,
        email: email,
        password: password,
      },{
        withCredentials:true,
      })
      
      .then((response) => {       
       if (response.data.success === true) {
        navigate("/");   
       }
     
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginTop:'80px'}} >
        <Container  style={{ width: '200px',padding:'50px',backgroundColor:"#EFEFEF",borderRadius:"100px" }}>
        // <img src={myImage} alt="Alt text for my image" />
        </Container>
        <Container style={{color:'#0B3558', fontFamily:'', fontSize:'48px'}}>
          <div style={{fontSize: '65px',fontFamily:'sans-serif',fontWeight:'bold', textAlign:'center',marginTop:"8px"}}>Welcome!</div>
          <div style={{fontSize: '20px',fontFamily:'sans-serif', textAlign:'center'}}> Let's connect to your workspace.</div>
          <div style={{fontSize: '20px',fontFamily:'sans-serif', textAlign:'center'}}> Please enter your email to continue.</div>
        </Container>
      <Container >
        <Container style={{ width: '550px', marginTop:"32px" }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUserChange}
            required
          />
        </Container>
        <Container style={{ width: '550px', marginTop:"32px" }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
          />
        </Container>
        <Container  style={{ width: '550px',marginTop:'27px' }}>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError ? "Password must be 8 characters long" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Switch /> : <Switch />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Container>
        <Container>
          <div style={{fontSize: '20px',fontFamily:'sans-serif',color:'#003FB9', textAlign:'center', fontWeight:'bold', marginLeft:'320px',marginTop:'16px'}}>Forgot Password?</div>
        </Container>
        <Container  style = {{width:"550px"}} >
          <Button type="submit" variant="contained" style={{ width: '500px',marginTop:'24px', color: "#FFFFFF", background:"#003FB9", textTransform:"none",fontSize:"24px" }} fullWidth >
            Sign In
          </Button>
        </Container>
      </Container>
      </div>
    </form>
  );
};

export default SignupForm;