import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import APIURL from "../helpers/environment";
import { RouteComponentProps, withRouter } from "react-router";


export interface StaffCreateProps {
    updateToken: Function,
    clearToken: Function,
    token: string | null
}
type PathParams = {
    uuid: string | undefined
}

type PropsType = RouteComponentProps<PathParams> & StaffCreateProps;

 
export interface StaffCreateState {
    email: string,
    password: string,
    token: string | null
}
 
class StaffCreate extends React.Component<PropsType, StaffCreateState> {
    constructor(props: PropsType) {
        super(props);
        this.state = {  
            email: "",
            password: "",
            token: ""
         };
    }

    handleSubmit = (event : any) => {
        event.preventDefault();
        const uuid = this.props.match.params.uuid;
        console.log(this.state.email);
        //CREATES STAFF
        fetch(`${APIURL}/staff/create/${uuid}`, {
            method: "POST",
            body: JSON.stringify({ staff: { 
                email: this.state.email, 
                password: this.state.password,
                active: false,
                admin: false
             } }),
    
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.props.updateToken(data.sessionToken);
                localStorage.setItem('admin', data.staff.admin);
                console.log('New Staff Account Created!');
            })
            .catch((err) => console.log(err));
        }

    
    render() { 
        return ( <div>
            <div> 
            <div style={{backgroundColor: '#FFD639', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <Typography variant="body1" component={'span'}>
                <Grid container   id="landingGrid">
                <Grid item md={4} xs={1}></Grid>
                    <Grid item md={4} xs={10} >
                        <Box >
                            <Box className="salesText">
                            <p>
                            This is the one time sign up page for restaurant staff. You should have followed this link from your employer.</p>
                            <p> This is not a login page and is for creating new accounts only. </p>
                            </Box>
                        </Box>
                        <Box padding="20px 0">
                            <Typography variant="h1">New Staff Sign Up</Typography>
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
                                <Button variant="contained"  fullWidth={true} color="secondary" id="wideBtn" onClick={this.handleSubmit}>Sign Up</Button><br/>
                            </form>
                            {/* TODO: Error Handling can go below */}
                            <Typography variant="body2"></Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} xs={1}></Grid>
                </Grid>
                </Typography>
        </div> 
        </div> );
    }
}
 
export default withRouter(StaffCreate);