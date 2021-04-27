import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import { isPartiallyEmittedExpression } from 'typescript';
// import Typography from '@material-ui/core/Typography';
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

type party = {
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

//Doesn't work. but especially doesn't work if I try to make vars not optional
type localVars = {
    isEditing?: boolean;
    isExpanded?: boolean;
}

//TODO: not using yet, not sure what to do with this.
type PartyPlusLocalVars =  localVars & party ;
 
export interface PartyDisplayState {
    isEditable: boolean,
    isExpanded: boolean,
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
    parties: PartyPlusLocalVars[],
    // parties: {
    //     id: number,
    //     name: string,
    //     partyNum: number,
    //     telephone: string,
    //     over21: boolean,
    //     timeEstimated: string,
    //     timeSeated: string,
    //     seated: boolean,
    //     leftUnseated: boolean,
    //     specialNotes: string,
    //     staffId: number,
    //     restaurantId: number,
    //     uniqueCode: string,
    //     timeArrived: string
    // }[]
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
        const partyPlaceholder = this.props.parties.map((party) => {
            return {
                    id: party.id,
                    name: party.name,
                    partyNum: party.partyNum,
                    telephone: party.telephone,
                    over21: party.over21,
                    timeEstimated: party.timeEstimated,
                    timeSeated: party.timeSeated,
                    seated: party.seated,
                    leftUnseated: party.leftUnseated,
                    specialNotes: party.specialNotes,
                    staffId: party.staffId,
                    restaurantId: party.restaurantId,
                    uniqueCode: party.uniqueCode,
                    timeArrived: party.timeArrived,
                    isEditing: false,
                    isExpanded: false
                }
        })

        this.state = {  
            isEditable: false,
            isExpanded: false,
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
            parties: [...partyPlaceholder]
         };
    }
    componentDidMount() {
        
        // const partyPlaceholder = this.props.parties.map((party) => {
        //     return {
        //             id: party.id,
        //             name: party.name,
        //             partyNum: party.partyNum,
        //             telephone: party.telephone,
        //             over21: party.over21,
        //             timeEstimated: party.timeEstimated,
        //             timeSeated: party.timeSeated,
        //             seated: party.seated,
        //             leftUnseated: party.leftUnseated,
        //             specialNotes: party.specialNotes,
        //             staffId: party.staffId,
        //             restaurantId: party.restaurantId,
        //             uniqueCode: party.uniqueCode,
        //             timeArrived: party.timeArrived,
        //             isEditing: false,
        //             isExpanded: false
        //         }
        // })

        // this.setState({ parties:[...partyPlaceholder]});
    }

    //makes nulls undefined for token
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

    //not fleshed out yet
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
                seated: party.seated,
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

    //toggles seated true/false, submits to db and re-renders 
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

    //toggles Left Unseated Value, submits to db, and re-renders
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
    
    //Just makes the phone number pretty. It is formated for Twilio in db but that doesn't look good for humans.
    formatPhoneNumber = (phoneNumberString: string) => {
        phoneNumberString = phoneNumberString.trim();
        let newNumber: string = phoneNumberString.slice(2,5)+ '-' +phoneNumberString.slice(6,9)+'-'+phoneNumberString.slice(7,11)
        return newNumber;
    }

    //deletes the record
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
        console.log("props",this.props.parties)
        console.log("state",this.state.parties);
        let time = dayjs();
        return ( 
            <div style={{ paddingBottom: "30px"}}>
                <div>{this.state.parties.map((party, index ) => 
                    {   
                    return(
                        // Checks current time and seated/left status and applies different css rules for each scenario
                        <div key={party.id} className=
                        {party.seated === true || party.leftUnseated === true ? "partyDisplayBox seatedPartyDisplayBox" : dayjs(party.timeEstimated, 'h:mm a') <= time ? "partyDisplayBox overduePartyDisplayBox" : "partyDisplayBox"} >
                            <b>
                            {/* First Line of Box */}


                            <Grid container className="partyDisplayBoxLine1" style={{justifyContent: "space-between"}}>
                                <Grid item sm={2} >
                                    <span className={party.seated === true || party.leftUnseated === true ? "timeBox seatedTimeBox" : dayjs(party.timeEstimated, 'h:mm a') <= time ? "timeBox overdueTimeBox":"timeBox"}>{dayjs(party.timeEstimated).format('h:mm a')}</span>
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
                                <Grid item container sm={2} style={{justifyContent: "space-between"}}>
                                    <ArrowDropDownCircleRoundedIcon color="primary" fontSize="large" className="rotateArrowBtn" />
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                        this.seatedUpdate(party)}}>
                                        {party.seated === false ? "Seat" : "Sat"}
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Second Line of Box */}
                            <Grid container>
                                <Grid item sm={6}>
                                    <span>Notes: <span className="notes">{party.specialNotes}</span></span>
                                </Grid>
                                <Grid item sm={2}>
                                    <span>arrived: <br/>{dayjs(party.timeArrived).format('h:mm a')}</span>
                                </Grid>
                                <Grid item container sm={4} style={{justifyContent: "space-between"}}>
                                    <Button variant="contained"  fullWidth={false}  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} 
                                    onClick={() => {this.setState({ isEditable: !this.state.isEditable})}} >
                                        {this.state.isEditable === true? "Save" : "Edit"}</Button>
                                {/* </Grid>
                                <Grid item sm={1}> */}
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                            this.leftUpdate(party)}}>{party.seated === false ? "Leaving" : "Left"}
                                    </Button>
                                {/* </Grid>
                                <Grid item sm={1}> */}
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