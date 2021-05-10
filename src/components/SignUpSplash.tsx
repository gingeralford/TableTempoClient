import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import handIpad from '../assets/handIpadsm.png';
import APIURL from "../helpers/environment";

export interface SignUpSplashProps {
    updateToken: Function,
    clearToken: Function,
    token: string | null
}
 
export interface SignUpSplashState {
    token: string | null,
    restaurantName: string,
    email: string ,
    password: string,
    uniqueCode: string,
    restaurantId: Number
}
 
class SignUpSplash extends React.Component<SignUpSplashProps, SignUpSplashState> {
    constructor(props: SignUpSplashProps) {
        super(props);
        this.state = {  
            token: props.token,
            restaurantName: "",
            email: "",
            password: "",
            uniqueCode: "",
            restaurantId: 0,
         };
    }

    // Thought it was FormEvent<HTMLInputElement>
    handleSubmit = () => {
        // event.preventDefault();
        console.log(this.state.restaurantName, this.state.email);
        //CREATES RESTAURANT ENTRY
        fetch(`${APIURL}/restaurant/create`, {
            method: "POST",
            body: JSON.stringify({ restaurant: { 
                restaurantName: this.state.restaurantName, 
                email: this.state.email, 
                password: this.state.password } }),

            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // this.props.updateToken(data.sessionToken);
                this.setState({ uniqueCode: data.restaurant.uniqueCode});
                this.setState({ restaurantId: data.restaurant.id })
                console.log('Restaurant Account created!');
            })
            //CREATES STAFF ENTRY IMMEDIATELY AFTER USING SAME EMAIL ETC, BUT WITH RESTAURANT ID AND UNIQUE CODE FROM THE RESPONSE
            .then((data) => fetch(`${APIURL}/staff/create/${this.state.uniqueCode}`, {
            method: "POST",
            body: JSON.stringify({ staff: { 
                uniqueCode: this.state.uniqueCode,
                restaurantId: this.state.restaurantId,
                restaurantName: this.state.restaurantName, 
                email: this.state.email, 
                password: this.state.password,
                active: "true",
                admin: "true"
        } }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            }))
            .then((response) => response.json())
            .then((data) => {
                this.props.updateToken(data.sessionToken);
                localStorage.setItem('admin', data.staff.admin);
                console.log('Staff account Created Too!');
            })
            .catch((err) => console.log(err));
    }


    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFD639', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <Typography variant="body1" component={'span'}>
                <Grid container id="landingGrid" >
                <Grid item md={1} xs={12} ></Grid>
                    <Grid item md={6} xs={12} id="landingImgGrid">
                    <img src={handIpad} alt="hand holding an ipad with Table Tempo software" id="ipadImg" />
                    </Grid>
                    <Grid item md={4}xs={12} >
                        <Box >
                            <Box className="salesText">
                            
                                Restaurants face a lot of challenges, from managing their guests' happiness and staffs' workflow, to getting the data they need to improve. Let us take waitlist management off your plate.
                            </Box>
                        </Box>
                        <Box padding="20px 0">
                            <Typography variant="h1">Streamline your wait today.</Typography>
                        </Box>    
                        <Box  mx="auto" padding="0" maxWidth="440px">
                            <Box>
                            <form className="">
                            <TextField className="signUpFields" required variant="filled"  label="Restaurant Name" inputProps={{ maxLength: 254 }}onChange={(event) => {
                                    this.setState({ restaurantName: event.target.value})
                                }} /><br/>
                            <TextField className="signUpFields" required variant="filled"  label="Email Address" inputProps={{ maxLength: 254 }}onChange={(event) => {
                                    this.setState({ email: event.target.value})
                                }} /><br/>
                            <TextField className="signUpFields" required variant="filled" label="Password" type="password" inputProps={{ maxLength: 100 }}onChange={(event) => {
                                    this.setState({ password: event.target.value})
                                }} /><br/>
                            <Button variant="contained"  fullWidth={true} color="secondary" id="wideBtn" onClick={this.handleSubmit}>Sign Up Now</Button><br/>
                        </form>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={1} xs={12} ></Grid>
                </Grid>
                </Typography>
            
            </>
         );
    }
}
 
export default SignUpSplash;