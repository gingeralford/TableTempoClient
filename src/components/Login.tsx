import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import APIURL from "../helpers/environment";

export interface LoginProps {
    updateToken: Function,
    clearToken: Function,
    token: string | null
}
 
export interface LoginState {
    email: string,
    password: string,
    token: string | null
}


 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {  
            token: props.token,
            email: "",
            password: ""
         };
    }

    handleSubmit = () => {
        // event.preventDefault();
        console.log(this.state.email);
        //CREATES RESTAURANT ENTRY
        fetch(`${APIURL}/staff/login`, {
            method: "POST",
            body: JSON.stringify({ staff: { 
                email: this.state.email, 
                password: this.state.password } }),
    
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.props.updateToken(data.sessionToken);
                console.log("admin status", data.admin)
                localStorage.setItem('admin', data.admin);
                console.log('Logged In!');
            })
            .catch((err) => console.log(err));
        }

    render() { 
        return ( 
        <div> 
            <div style={{backgroundColor: '#FFD639', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <Typography variant="body1" component={'span'}>
                <Grid container   id="landingGrid">
                <Grid item md={4} xs={1}></Grid>
                    <Grid item md={4} xs={10} >
                        <Box >
                            <Box className="salesText">
                            {/* TODO: Replace this text! */}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore culpa, iste odit itaque ipsa ullam! Sed dolores temporibus quisquam molestias dolorum perferendis, perspiciatis est officia aut error odit iusto omnis!
                            </Box>
                        </Box>
                        <Box padding="20px 0">
                            <Typography variant="h1">Log In</Typography>
                        </Box>    
                        <Box  mx="auto" padding="0" maxWidth="440px">
                            <Box>
                            <form className="signUpForm">
                                <TextField className="signUpFields" required variant="filled"  label="Email Address" onChange={(event) => {
                                        this.setState({ email: event.target.value})
                                    }} /><br/>
                                <TextField className="signUpFields" required variant="filled" label="Password" type="password" onChange={(event) => {
                                    this.setState({ password: event.target.value})
                                }} /><br/>
                                {/* <input className="signUpFields" type="email" placeholder="Email Address" 
                                onChange={(event) => {
                                    this.setState({ email: event.target.value})
                                }} /><br/>
                                <input className="signUpFields" type="password" placeholder="Password"
                                onChange={(event) => {
                                    this.setState({ password: event.target.value})
                                }}
                                /><br/> */}
                                <Button variant="contained"  fullWidth={true} color="secondary" id="wideBtn" onClick={this.handleSubmit}>Log In</Button><br/>
                            </form>
                            <Typography variant="body2">Don't have an account? You'll need to notify your Restaurant manager to send you a link to Sign up!</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={1}></Grid>
                </Grid>
                </Typography>
        </div> 
        );
    }
}
 
export default Login;