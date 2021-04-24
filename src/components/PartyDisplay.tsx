import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
var dayjs = require('dayjs');


export interface PartyDisplayProps {
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
 
export interface PartyDisplayState {
    name: string,
    partyNum: number,
    telephone: string,
    over21: boolean,
    timeEstimated: string,
    timeSeated: string | string,
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

export interface IParty {
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
}
 
class PartyDisplay extends React.Component<PartyDisplayProps, PartyDisplayState> {
    constructor(props: PartyDisplayProps) {
        super(props);
        this.state = {  
            name: "",
            partyNum: 0,
            telephone: "",
            over21: false,
            timeEstimated: "",
            timeSeated: "",
            seated: false,
            leftUnseated: false,
            specialNotes: "",
            staffId: 0,
            restaurantId: 0,
            uniqueCode: "",
            parties: [{
                id: 0,
                name: "",
                partyNum: 0,
                telephone: "",
                over21: false,
                timeEstimated: "",
                timeSeated: "",
                seated: false,
                leftUnseated: false,
                specialNotes: "",
                staffId: 0,
                restaurantId: 0,
                uniqueCode: "",
                timeArrived: ""
            }]
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
    //TODO: update Iparty to get ALL the Data
    updateParty = (party: IParty) => {
        console.log(`updating ${party.id}`);
        fetch(`${APIURL}/party/update/${party.id}`, 
        {
            body: JSON.stringify({ party: { 
                name: party.name, 
                partyNum: party.partyNum,
                telephone: party.telephone,
                over21: party.over21,
                timeEstimated: party.timeEstimated,
                timeSeated: party.timeSeated,
                seated: this.state.seated,
                leftUnseated: party.leftUnseated,
                specialNotes: party.specialNotes,
             } }),
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log('Party Updated')
                this.props.fetchParties();
            })
            .catch((err) => console.log(err));
    }

    //toggles seated true/false
    seatedUpdate = (party: IParty) => {
        let seated : boolean = true;
        party.seated === false ? seated = true : seated = false;
        fetch(`${APIURL}/party/update/${party.id}`, {
            body: JSON.stringify({ party: { 
                seated: seated
             } }),
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log(` ${party.name} is seated`);
                this.props.fetchParties();
            })
            .catch((err) => console.log(err));
    }

    //toggles Left Unseated Value
    leftUpdate = (party: IParty) => {
        let left : boolean = true;
        party.leftUnseated === false ? left = true : left = false;
        fetch(`${APIURL}/party/update/${party.id}`, {
            body: JSON.stringify({ party: { 
                leftUnseated: left
             } }),
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log(` ${party.name} Left`);
                this.props.fetchParties();
            })
            .catch((err) => console.log(err));
    }
    

    formatPhoneNumber = (phoneNumberString: string) => {
        phoneNumberString = phoneNumberString.trim();
        let newNumber: string = phoneNumberString.slice(2,5)+ '-' +phoneNumberString.slice(6,9)+'-'+phoneNumberString.slice(7,11)
        return newNumber;
      }

    deleteParty = (party: IParty) => {
        console.log(`deleting ${party.id}`);
        fetch(`${APIURL}/party/delete/${party.id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log('Party Deleted')
                this.props.fetchParties();
                
            })
            .catch((err) => console.log(err));
    }
    //TODO: Ternary where having editing = true makes it render element as editable inputs vs not??
    //TODO: Try building similar components but with inputs
    render() { 
        return ( 
            <div style={{ paddingBottom: "30px"}}>
                <div>{this.props.parties.map((party, index ) => 
                    {   
                    return(
                        <div key={party.id} className={party.seated === true || party.leftUnseated === true ? "seatedPartyDisplayBox" : "partyDisplayBox" } >
                            <b>
                            <Grid container className="partyDisplayBoxLine1" justify="space-between">
                                
                                <Grid item sm={2} >
                                    <span className={party.seated === true || party.leftUnseated === true ? "seatedTimeBox" : "timeBox"}>{dayjs(party.timeEstimated).format('h:mm a')}</span>
                                </Grid>
                                <Grid item sm={3}>
                                    <span>{party.partyNum} - {party.name}</span>
                                </Grid>
                                {/* <Grid item sm={1}>
                                    <span>{party.partyNum}</span>
                                </Grid> */}
                                <Grid item sm={3}>
                                    <span>{this.formatPhoneNumber(party.telephone)}</span>
                                </Grid>
                                <Grid item sm={2}>
                                    <span>{party.over21 === true ? "over 21" : "under 21"}</span>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                        this.seatedUpdate(party)}}>
                                        {party.seated === false ? "Seat" : "UnSeat"}
                                    </Button>
                                </Grid>
                                
                            </Grid>
                            <Grid container>
                                <Grid item sm={6}>
                                    <span>Notes: <i>{party.specialNotes}</i></span>
                                </Grid>
                                <Grid item sm={2}>
                                    <span>time arrived: {dayjs(party.timeArrived).format('h:mm a')}</span>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button variant="contained"  fullWidth={false}  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} >Edit</Button>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                            this.leftUpdate(party)}}>Left
                                    </Button>
                                </Grid>
                                <Grid item sm={2}>
                                    <Button variant="contained" fullWidth={false}  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "delete"} onClick={() => this.deleteParty(party)}>Delete</Button><br/>
                                </Grid>
                            </Grid></b>
                        </div>
                    )})}
                </div>
            </div>
         );
    }
}
 
export default PartyDisplay;