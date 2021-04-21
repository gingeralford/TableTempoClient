import * as React from 'react';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import APIURL from "../helpers/environment";
// import { tokenToString } from 'typescript';
var dayjs = require('dayjs');

export interface PartyCreateProps {
    token: string | null
}
 
export interface PartyCreateState {
    name: string,
    partyNum: number,
    telephone: string,
    over21: boolean,
    timeEstimated: Date,
    timeSeated: Date | string,
    seated: false,
    leftUnseated: false,
    specialNotes: string,
    staffId: number,
    restaurantId: number,
    uniqueCode: string,
}
 
class PartyCreate extends React.Component<PartyCreateProps, PartyCreateState> {
    constructor(props: PartyCreateProps) {
        super(props);
        this.state = { 
            name: "",
            partyNum: 0,
            telephone: "",
            over21: false,
            timeEstimated: dayjs(),
            timeSeated: "",
            seated: false,
            leftUnseated: false,
            specialNotes: "",
            staffId: 0,
            restaurantId: 0,
            uniqueCode: ""
          };
    }

    removeNulls =(obj: any) => {
        if (obj === null) {
            return undefined;
        }
        if (typeof obj === 'object') {
            for (let key in obj) {
                obj[key] = this.removeNulls(obj[key]);
            }
        }
        return obj;
    }

    handleSubmit = (event : any) => {
        
        // event.preventDefault();
        //CREATES RESTAURANT ENTRY
        fetch(`${APIURL}/party/create`, {
            method: "POST",
            body: JSON.stringify({ party: { 
                name: this.state.name, 
                partyNum: this.state.partyNum,
                telephone: this.state.telephone,
                over21: this.state.over21,
                timeArrived: dayjs(),
                timeEstimated: this.state.timeEstimated,
                timeSeated: this.state.timeSeated,
                specialNotes: this.state.specialNotes,
             } }),
    
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                console.log('Party Created!');
            })
            .catch((err) => console.log(err));
        }


    render() { 
        return ( 
            <div style={{paddingTop: "80px"}}>
                <Grid container>
                <Grid item md={1}></Grid>
                <Grid item md={10}>
                <form className="partyCreate">
                    {/* <TextField className="signUpFields" required variant="filled"  label="Email Address" onChange={(event) => {
                            this.setState({ email: event.target.value})
                        }} /><br/>
                    <TextField className="signUpFields" required variant="filled" label="Password" type="password" onChange={(event) => {
                        this.setState({ password: event.target.value})
                    }} /><br/> */}
                    <input className="signUpFields" type="textfield" placeholder="Party Name" 
                    onChange={(event) => {
                        this.setState({ name: event.target.value})
                    }} /><br/>
                    <input className="signUpFields" type="number" placeholder="Number of Guests"
                    onChange={(event) => {
                        this.setState({ partyNum: parseInt(event.target.value)})
                    }}
                    /><br/>
                    <input className="signUpFields" type="textfield" placeholder="telephone #"
                    onChange={(event) => {
                        this.setState({ telephone: `+1${event.target.value}`})
                    }}
                    /><br/><label>Over 21?
                    <input className="signUpFields" type="checkbox" placeholder="over 21?"
                    onChange={(event) => {
                        this.setState({ over21: event.target.checked})
                    }}
                    /></label><br/>
                    <label>Estimated Time?<br/>
                    <input className="signUpFields" type="number" placeholder="Estimated Mins til Seated"
                    onChange={(event) => {
                        this.setState({ timeEstimated: dayjs().add(event.target.value, 'minute')})
                    }}
                    // /></label><br/>
                    // <label>Time Seated?
                    // <input className="signUpFields" type="datetime-local" placeholder="Time Seated"
                    // onChange={(event) => {
                    //     this.setState({ timeSeated: new Date(event.target.value)})
                    // }}
                    /><br/></label>
                    <textarea className="signUpFields"  placeholder="Special Notes"
                    onChange={(event) => {
                        this.setState({ specialNotes: event.target.value})
                    }}
                    /><br/>
                    <Button variant="contained"  fullWidth={false} color="secondary" id="wideBtn" onClick={this.handleSubmit}>Done</Button><br/>
                            </form>
                </Grid>
                <Grid item md={1}></Grid>
                </Grid>
            </div>
         );
    }
}
 
export default PartyCreate;
