import * as React from 'react';
// import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import APIURL from "../helpers/environment";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

// import { tokenToString } from 'typescript';
var dayjs = require('dayjs');

export interface PartyCreateProps {
    token: string | null,
    fetchParties: Function,
    parties: {
        id: number,
        name: string,
        partyNum: number,
        telephone: string,
        over21: boolean,
        timeEstimated: string,
        timeSeated: string,
        seated: boolean,
        leftUnseated: boolean,
        specialNotes: string,
        staffId: number,
        restaurantId: number,
        uniqueCode: string,
        timeArrived: string
    }[]
}
 
export interface PartyCreateState {
    name: string,
    partyNum: number,
    telephone: string,
    over21: boolean,
    timeEstimated: Date,
    timeSeated: Date,
    seated: boolean,
    leftUnseated: boolean,
    specialNotes: string,
    staffId: number,
    restaurantId: number,
    uniqueCode: string,
    parties: {
        id: number,
        name: string,
        partyNum: number,
        telephone: string,
        over21: boolean,
        timeEstimated: string,
        timeSeated: string,
        seated: boolean,
        leftUnseated: boolean,
        specialNotes: string,
        staffId: number,
        restaurantId: number,
        uniqueCode: string,
        timeArrived: string
    }[]
}
 
class PartyCreate extends React.Component<PartyCreateProps, PartyCreateState> {
    constructor(props: PartyCreateProps) {
        super(props);
        this.state = { 
            name: "",
            partyNum: 0,
            telephone: "",
            over21: false,
            timeEstimated: dayjs(new Date()),
            timeSeated: dayjs(new Date()),
            seated: false,
            leftUnseated: false,
            specialNotes: "",
            staffId: 0,
            restaurantId: 0,
            uniqueCode: "",
            parties: this.props.parties
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

    // clearForm = () => {
    //     this.setState({
    //         name: "",
    //         partyNum: 0,
    //         telephone: "",
    //         over21: false,
    //         timeEstimated: dayjs(new Date()),
    //         timeSeated: dayjs(new Date()),
    //         seated: false,
    //         leftUnseated: false,
    //         specialNotes: "",
    //         staffId: 0,
    //         restaurantId: 0,
    //         uniqueCode: ""
    //     })
    // }

    handleSubmit = () => {
        
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
                console.log(data);
                console.log('Party Created!');
                this.props.fetchParties();
                // this.clearForm();
            })
            .catch((err) => console.log(err));
        }


    render() { 
        return ( 
            <div >
                <div className="partyDisplayBox">
                <form className="partyCreate" onSubmit={this.handleSubmit}>
                <Grid container style={{justifyContent: "space-between", marginBottom: "12px" }}>
                <Grid item sm={2} xs={6} className="partyDisplayBoxLine1" >
                    <TextField size="small" variant="outlined" className="partyinputs" type="number" label="# Guests"
                    onChange={(event) => {
                        this.setState({ partyNum: parseInt(event.target.value)})
                    }}/>
                </Grid>
                <Grid item sm={3} xs={6} className="partyDisplayBoxLine1">
                    <TextField variant="outlined" className="partyinputs" label="Party Name" type="textfield" size="small" 
                    onChange={(event) => {
                        this.setState({ name: event.target.value})
                    }} /><br/>
                </Grid>
                <Grid item sm={3} xs={7} className="partyDisplayBoxLine1">
                    <TextField size="small" variant="outlined" className="partyinputs" type="textfield" label="telephone #" 
                    onChange={(event) => {
                        this.setState({ telephone: `+1${event.target.value}`})
                    }}/>
                </Grid>
                <Grid item sm={2} xs={5} className="partyDisplayBoxLine1">
                <FormControl component="fieldset">
                <FormGroup aria-label="Over 21" row>
                <FormControlLabel
                    control={<Checkbox color="primary" onChange={(event) => {
                        this.setState({ over21: event.target.checked})
                    }}/>}
                    label="Over 21?"
                    labelPlacement="start"
                    />
                </FormGroup>
                </FormControl>
                    {/* <label>Over 21?
                    <input className="partyinputs" type="checkbox" placeholder="over 21?"
                    onChange={(event) => {
                        this.setState({ over21: event.target.checked})
                    }}
                    /></label> */}
                </Grid>
                <Grid item sm={2} xs={12} className="partyDisplayBoxLine1">
                    <TextField style={{ width: "100%"}}size="small" variant="outlined" className="partyinputs" type="number" label="Est. Mins."
                    onChange={(event) => {
                        this.setState({ timeEstimated: dayjs().add(event.target.value, 'minute')})
                    }}
                
                    // /></label><br/>
                    // <label>Time Seated?
                    // <input className="signUpFields" type="datetime-local" placeholder="Time Seated"
                    // onChange={(event) => {
                    //     this.setState({ timeSeated: new Date(event.target.value)})
                    // }}
                    />
                </Grid>
                </Grid>
                <Grid container  style={{justifyContent: "space-between", alignItems: "end"}}>
                    <Grid item sm={8} xs={12} className="partyDisplayBoxLine1">
                    <TextField multiline={true} rows={1} size="small" variant="outlined" className="partyinputs"  label="Notes"
                    onChange={(event) => {
                        this.setState({ specialNotes: event.target.value})
                    }}
                    /></Grid>
                    <Grid item sm={3} xs={9} className="partyDisplayBoxLine1"><Typography variant="body1" ><span className="lineUpBtn" style={{ paddingTop:"12px"}}>Current Time: {dayjs().format('h:mm a')}</span></Typography>
                    </Grid>
                    <Grid item sm={1}  xs={3} className="partyDisplayBoxLine1">
                    <div style={{ textAlign: "right"}}>
                    <Button variant="contained" className="lineUpBtn" fullWidth={false} color="secondary" id="orangeBtn" type="submit" >Save</Button></div>
                    </Grid>
                </Grid>
                </form>
                
                </div>
            </div>
            // <div >
            //     <div className="partyDisplayBox">
            //     <Grid container >
            //     <Grid item md={1}></Grid>
            //     <Grid item md={10}>
            //     <form className="partyCreate" onSubmit={this.handleSubmit}>
            //         {/* <TextField className="signUpFields" required variant="filled"  label="Email Address" onChange={(event) => {
            //                 this.setState({ email: event.target.value})
            //             }} /><br/>
            //         <TextField className="signUpFields" required variant="filled" label="Password" type="password" onChange={(event) => {
            //             this.setState({ password: event.target.value})
            //         }} /><br/> */}
            //         <TextField variant="outlined" className="partyinputs" label="Party Name" type="textfield" size="small" 
            //         onChange={(event) => {
            //             this.setState({ name: event.target.value})
            //         }} /><br/>
            //         {/* <input className="signUpFields" type="textfield" placeholder="Party Name" 
            //         onChange={(event) => {
            //             this.setState({ name: event.target.value})
            //         }} /><br/> */}
            //         <input className="partyinputs" type="number" placeholder="Number of Guests"
            //         onChange={(event) => {
            //             this.setState({ partyNum: parseInt(event.target.value)})
            //         }}
            //         /><br/>
            //         <input className="partyinputs" type="textfield" placeholder="telephone #" 
            //         onChange={(event) => {
            //             this.setState({ telephone: `+1${event.target.value}`})
            //         }}
            //         /><br/><label>Over 21?
            //         <input className="partyinputs" type="checkbox" placeholder="over 21?"
            //         onChange={(event) => {
            //             this.setState({ over21: event.target.checked})
            //         }}
            //         /></label><br/>
            //         <label>Estimated Time?<br/>
            //         <input className="partyinputs" type="number" placeholder="Estimated Mins til Seated"
            //         onChange={(event) => {
            //             this.setState({ timeEstimated: dayjs().add(event.target.value, 'minute')})
            //         }}
            //         // /></label><br/>
            //         // <label>Time Seated?
            //         // <input className="signUpFields" type="datetime-local" placeholder="Time Seated"
            //         // onChange={(event) => {
            //         //     this.setState({ timeSeated: new Date(event.target.value)})
            //         // }}
            //         /></label><br/>
            //         <textarea className="partyinputs"  placeholder="Special Notes"
            //         onChange={(event) => {
            //             this.setState({ specialNotes: event.target.value})
            //         }}
            //         /><br/>
            //         <Button variant="contained"  fullWidth={false} color="secondary" id="seatedBtn" type="submit" >Done</Button><br/>
            //                 </form>
            //     </Grid>
            //     <Grid item md={1}></Grid>
            //     </Grid>
            //     </div>
            // </div>
         );
    }
}
 
export default PartyCreate;
