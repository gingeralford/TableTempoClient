import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditParty from './EditParty';
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
    timeArrived: string,
    isEditing?: boolean,
    isExpanded?: boolean
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
    // componentDidMount() {
        
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
    // }

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

    // updateParty = (e: React.FormEvent, party: IParty) => {
    //     e.preventDefault();
    //     console.log(`updating ${party.id}`);
    //     console.log(party)
    //     fetch(`${APIURL}/party/update/${party.id}`, 
    //     {
    //         body: JSON.stringify({ party: { 
    //             name: party.name, 
    //             partyNum: party.partyNum,
    //             telephone: party.telephone,
    //             over21: party.over21,
    //             // timeEstimated: party.timeEstimated,
    //             timeSeated: party.timeSeated,
    //             seated: party.seated,
    //             leftUnseated: party.leftUnseated,
    //             specialNotes: party.specialNotes,
    //          } }),
    //         method: "PUT",
    //         headers: new Headers({
    //           "Content-Type": "application/json",
    //           Authorization: this.removeNulls(localStorage.getItem('token'))
    //         }),
    //       })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log('Party Updated')
    //             this.props.fetchParties();
    //         })
    //         .catch((err) => console.log(err));
    // }

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
    changeEditStatus = (party: IParty, index: number) => {
        this.setState({ parties: 
        this.state.parties.map((party, i) => (index === i) ? {...party, isEditing: !party.isEditing }: party) })
        // console.log("edit function",this.state.parties)
    }

    changeExpandStatus = (party: IParty, index: number) => {
        this.setState({ parties: 
        this.state.parties.map((party, i) => (index === i) ? {...party, isExpanded: !party.isExpanded} : party)})
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

    changeValue = (event: any) => {
        this.setState({ name: event.target.value})
    }

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
                        <div key={index}>

                        {/* Ternary that wraps whole map determines if the Editable version or Display version of data is shown */}
                        {party.isEditing === true ? 
                        
                        <div>
                            <EditParty 
                            index={index} 
                            party={party} 
                            changeEditStatus={this.changeEditStatus}
                            deleteParty={this.deleteParty}
                            fetchParties={this.props.fetchParties}
                            removeNulls={this.removeNulls}
                            leftUpdate={this.leftUpdate}
                            seatedUpdate={this.seatedUpdate}
                            />
                        </div>
                    
                        :

                        <div  className=
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
                                <Grid item sm={2}>
                                    <span>arrived: {dayjs(party.timeArrived).format('h:mm a')}</span>
                                </Grid>
                                
                                <Grid item sm={2}>
                                    <span>{party.over21 === true ? "over 21" : "under 21"}</span>
                                </Grid>
                                <Grid item container sm={2} style={{justifyContent: "space-between"}}>

                                    <ExpandMoreIcon color={party.seated? "inherit" :"secondary"} fontSize="large" className={party.isExpanded? "regularArrowBtn" : "rotateArrowBtn"} 
                                    onClick={() => this.changeExpandStatus(party, index)}/>
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                        this.seatedUpdate(party)}}>
                                        {party.seated === false ? "Seat" : "Sat"}
                                    </Button>
                                </Grid>
                            </Grid></b>
                            {party.isExpanded ? 
                            
                            <Grid container className="partyDisplayBoxLine1">
                                <Grid item sm={6}>
                                    <span>Notes: <span className="notes">{party.specialNotes}</span></span>
                                </Grid>
                                <Grid item sm={3}>
                                    <span>{this.formatPhoneNumber(party.telephone)}</span>
                                </Grid>
                                <Grid item container sm={3} style={{justifyContent: "space-between"}}>
                                    <Grid item>
                                    <Button variant="contained"  fullWidth={false}  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} 
                                    onClick={() => this.changeEditStatus(party, index)}
                                    >Edit</Button>
                                    </Grid>
                                {/* </Grid>
                                <Grid item sm={1}> */}
                                    <Grid item>
                                    <Button variant="contained"  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                            this.leftUpdate(party)}}>{party.leftUnseated === false ? "Leaving" : "Left"}
                                    </Button>
                                    </Grid>
                                {/* </Grid>
                                <Grid item sm={1}> */}
                                    <Grid item>
                                    <Button variant="contained" fullWidth={false}  id={party.seated === true || party.leftUnseated === true ? "seatedBtn" : "delete"} onClick={() => this.deleteParty(party)}>Delete</Button><br/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            : <div></div>}
                             <div></div> 
                            
                        </div>
                    }
                    </div>)})}
                </div>
            </div>
         );
    }
}
 
export default PartyDisplay;