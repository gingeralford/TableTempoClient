import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import APIURL from "../helpers/environment";


export interface LoginModalProps {
    updateToken: Function,
    clearToken: Function,
    token: string | null
}
 
export interface LoginModalState {
    email: string,
    password: string,
    token: string | null,
    open: boolean
}


class LoginModal extends React.Component<LoginModalProps, LoginModalState> {
    constructor(props: LoginModalProps) {
        super(props);
        this.state = { 
            token: props.token,
            email: "",
            password: "",
            open: false
          };
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        console.log(this.state.email);
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
                console.log("admin status", data.staff.admin);
                localStorage.setItem('admin', data.staff.admin);
                console.log('Logged In!');
            })
            .catch((err) => console.log(err));
        }


  handleOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false});
  };


  body: JSX.Element = (
    <div  className="loginModal">
      <form className="signUpForm">
        <TextField className="signUpFields" required variant="filled"  label="Email Address" onChange={(event) => {
                this.setState({ email: event.target.value})
            }} /><br/>
        <TextField className="signUpFields" required variant="filled" label="Password" type="password" onChange={(event) => {
            this.setState({ password: event.target.value})
        }} /><br/>
        <Button variant="contained"  fullWidth={true} color="secondary" id="wideBtn" onClick={this.handleSubmit}>Log In</Button><br/>
      </form>
      <Typography variant="body2">Don't have an account? You'll need to notify your Restaurant manager to send you a custom link to Sign up!</Typography>
    </div>
  );

    //Actual button exported to SiteBar is HERE
    render(){
        return (
            <div>
            <Button variant="contained" color="secondary" id="loginBtn" onClick={this.handleOpen}>
                Log In
            </Button>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby=""
                aria-describedby="loginModal signUpForm"
                disableBackdropClick={false}
            >
                {this.body}
            </Modal>
            </div>
        );
    }
}

export default LoginModal;