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
    loading: boolean,
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
            loading: false,
            name: "",
            partyNum: 1,
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
    //     let formToClear:HTMLFormElement;
    //     formToClear = <HTMLFormElement>document.getElementById("clearableForm")
    //     if (formToClear === null) {
    //         alert('oops');
    //       } else {
    //         // since you've done the nullable check
    //         // TS won't complain from this point on
    //         formToClear.reset() // <- no error
    //       }
    //   }


    handleSubmit = (event: any) => {
        
        // event.preventDefault();
        this.setState({loading: true})
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
                this.setState({loading: false})
                this.props.fetchParties();
                this.setState({
                    name: "", 
                    partyNum: 1,
                    telephone: "",
                    over21: false,
                    timeEstimated: dayjs(),
                    timeSeated: dayjs(),
                    specialNotes: ""})
                // this.clearForm();
            })
            .catch((err) => console.log(err));
        }



    render() { 
        return ( 
            <div >
                <div className="partyDisplayBox">
                <form className="partyCreate"  id="clearableForm">
                <Grid container style={{justifyContent: "space-between" }}>
                <Grid item sm={2} xs={6} className="partyDisplayBoxLine1" >
                    <TextField margin="none" size="small" variant="outlined" className="partyinputs" type="number" inputProps={{ maxLength: 2, min: 1}}label="# Guests" 
                    onChange={(event) => {
                        this.setState({ partyNum: parseInt(event.target.value)})
                    }}/>
                </Grid>
                <Grid item sm={3} xs={6} className="partyDisplayBoxLine1">
                    <TextField margin="none" variant="outlined" className="partyinputs" label="Party Name" type="textfield" size="small" inputProps={{ maxLength: 40 }} 
                    onChange={(event) => {
                        this.setState({ name: event.target.value})
                    }} /><br/>
                </Grid>
                <Grid item sm={3} xs={12} className="partyDisplayBoxLine1">
                    <TextField size="small" variant="outlined" className="partyinputs" inputProps={{ maxLength: 10 }} type="textfield" label="telephone #" 
                
                    onChange={(event) => {
                        this.setState({ telephone: `+1${event.target.value}`})
                    }}/>
                </Grid>
                <Grid item sm={2} xs={6} className="partyDisplayBoxLine1">
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

                </Grid>
                <Grid item sm={2} xs={6} className="partyDisplayBoxLine1">
                    <TextField style={{ width: "100%"}}size="small" variant="outlined" className="partyinputs" type="number" label="Est. Mins." inputProps={{ maxLength: 3, min: 0 }} 
                    onChange={(event) => {
                        this.setState({ timeEstimated: dayjs().add(event.target.value, 'minute')})
                    }}/>
                </Grid>
                </Grid>
                <Grid container  style={{justifyContent: "space-between"}}>
                    <Grid item md={8} sm={7} xs={12} style={{ flexShrink: 3}}className="partyDisplayBoxLine1">
                    <TextField multiline={true} rows={1} size="small" variant="outlined"  className="partyinputs"  label="Notes" inputProps={{ maxLength: 140 }}
                    
                    onChange={(event) => {
                        this.setState({ specialNotes: event.target.value})
                    }}
                    /></Grid>
                    <Grid item md={3} sm={3} xs={9} className="partyDisplayBoxLine1"><Typography variant="body1" ><span className="lineUpBtn" style={{ paddingTop:"12px"}}>Current Time: {dayjs().format('h:mm a')}</span></Typography>
                    </Grid>
                    <Grid item md={1} sm={2}  xs={3} className="partyDisplayBoxLine1" style={{ textAlign: "right"}}>
                    
                    <Button variant="contained" className="lineUpBtn" fullWidth={false} color="secondary" id="orangeBtn" type="submit" onClick={this.handleSubmit}
                    >Save</Button>
                    </Grid>
                </Grid>
                </form>
                
                </div>
            </div>

         );
    }
}
 
export default PartyCreate;
