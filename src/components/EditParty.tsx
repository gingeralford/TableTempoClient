import * as React from 'react';
import Button from '@material-ui/core/Button';
import APIURL from "../helpers/environment";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
var dayjs = require('dayjs');


export interface EditPartyProps {
    party: {
        isEditing?: boolean;
        isExpanded?: boolean;
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
    },
    changeEditStatus: Function,
    deleteParty: Function,
    fetchParties: Function,
    removeNulls: Function,
    leftUpdate: Function,
    seatedUpdate: Function,
    index: number
}
 
export interface EditPartyState {
    party: {
        isEditing?: boolean;
        isExpanded?: boolean;
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
    },
    isEditing?: boolean;
    isExpanded?: boolean;
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

 
class EditParty extends React.Component<EditPartyProps, EditPartyState> {
    constructor(props: EditPartyProps) {
        super(props);
        this.state = { 
            party: {
                isEditing: props.party.isEditing,
                isExpanded: props.party.isExpanded,
                id: props.party.id,
                name: props.party.name,
                partyNum: props.party.partyNum,
                telephone: props.party.telephone,
                over21: props.party.over21,
                timeEstimated: props.party.timeEstimated,
                timeSeated: props.party.timeSeated,
                seated: props.party.seated,
                leftUnseated: props.party.leftUnseated,
                specialNotes: props.party.specialNotes,
                staffId: props.party.staffId,
                restaurantId: props.party.restaurantId,
                uniqueCode: props.party.uniqueCode,
                timeArrived: props.party.timeArrived
            },
            isEditing: props.party.isEditing,
            isExpanded: props.party.isExpanded,
            id: props.party.id,
            name: props.party.name,
            partyNum: props.party.partyNum,
            telephone: props.party.telephone,
            over21: props.party.over21,
            timeEstimated: props.party.timeEstimated,
            timeSeated: props.party.timeSeated,
            seated: props.party.seated,
            leftUnseated: props.party.leftUnseated,
            specialNotes: props.party.specialNotes,
            staffId: props.party.staffId,
            restaurantId: props.party.restaurantId,
            uniqueCode: props.party.uniqueCode,
            timeArrived: props.party.timeArrived
          };
    }

    // constantUpdate = () => {
    //     this.setState({ party: {
    //         isEditing: this.state.isEditing,
    //         isExpanded: this.state.isExpanded,
    //         id: this.state.id,
    //         name: this.state.name,
    //         partyNum: this.state.partyNum,
    //         telephone: this.state.telephone,
    //         over21: this.state.over21,
    //         timeEstimated: this.state.timeEstimated,
    //         timeSeated: this.state.timeSeated,
    //         seated: this.state.seated,
    //         leftUnseated: this.state.leftUnseated,
    //         specialNotes: this.state.specialNotes,
    //         staffId: this.state.staffId,
    //         restaurantId: this.state.restaurantId,
    //         uniqueCode: this.state.uniqueCode,
    //         timeArrived: this.state.timeArrived
    //     }})
    // };


    updateParty = (e: React.FormEvent, party: IParty) => {
        e.preventDefault();
        console.log(`updating ${party.id}`);
        console.log(party)
        fetch(`${APIURL}/party/update/${party.id}`, 
        {
            body: JSON.stringify({ party: { 
                name: party.name, 
                partyNum: party.partyNum,
                telephone: party.telephone,
                over21: party.over21,
                // timeEstimated: party.timeEstimated,
                timeSeated: party.timeSeated,
                seated: party.seated,
                leftUnseated: party.leftUnseated,
                specialNotes: party.specialNotes,
             } }),
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log('Party Updated')
                this.props.fetchParties();
            })
            .catch((err) => console.log(err));
    }

    render() { 
        let time : Date = dayjs();
        return ( 
            <div className=
            {this.state.seated === true || this.state.leftUnseated === true ? "partyDisplayBox seatedPartyDisplayBox" : dayjs(this.state.timeEstimated, 'h:mm a') <= time ? "partyDisplayBox overduePartyDisplayBox" : "partyDisplayBox"}>
                        <form className="partyCreate" onSubmit={(e) => {
                            this.setState({ party: {
                                isEditing: this.state.isEditing,
                                isExpanded: this.state.isExpanded,
                                id: this.state.id,
                                name: this.state.name,
                                partyNum: this.state.partyNum,
                                telephone: this.state.telephone,
                                over21: this.state.over21,
                                timeEstimated: this.state.timeEstimated,
                                timeSeated: this.state.timeSeated,
                                seated: this.state.seated,
                                leftUnseated: this.state.leftUnseated,
                                specialNotes: this.state.specialNotes,
                                staffId: this.state.staffId,
                                restaurantId: this.state.restaurantId,
                                uniqueCode: this.state.uniqueCode,
                                timeArrived: this.state.timeArrived
                            }}, () => {
                                this.updateParty(e, this.state.party)
                            })}}>
                            {/* <TextField className="partyinputs" required variant="filled"  label="Email Address" onChange={(event) => {
                                    this.setState({ email: event.target.value})
                                }} /><br/>
                            <TextField className="partyinputs" required variant="filled" label="Password" type="password" onChange={(event) => {
                                this.setState({ password: event.target.value})
                            }} /><br/> */}
                            <Grid container style={{justifyContent: "space-between"}} >
                                <Grid item sm={2} xs={4} className="partyDisplayBoxLine1">
                                    <span className={this.state.seated === true || this.state.leftUnseated === true ? "timeBox seatedTimeBox" : dayjs(this.state.timeEstimated, 'h:mm a') <= time ? "timeBox overdueTimeBox":"timeBox"}>{dayjs(this.state.timeEstimated).format('h:mm a')}</span>
                                </Grid>
                                <Grid item sm={1} xs={3} className="partyDisplayBoxLine1">
                                    <TextField margin="none" size="small" variant="outlined" value={this.state.partyNum} className="partyinputs" type="number" label="# Guests" inputProps={{ maxLength: 2 }}
                                    onChange={(event) => {
                                        this.setState({ partyNum: parseInt(event.target.value)})
                                    }}/>
                                    {/* <input className="partyinputs  partyNumInput"  type="number" placeholder="Number of Guests" value={this.state.partyNum}
                                    onChange={(event) => {
                                        this.setState({ partyNum: parseInt(event.target.value)})
                                    }}
                                    /> */}
                                </Grid>
                                <Grid item sm={3} xs={5} className="partyDisplayBoxLine1">
                                    <TextField margin="none" variant="outlined" value={this.state.name} className="partyinputs" label="Party Name" type="textfield" size="small" inputProps={{ maxLength: 40 }}
                                    onChange={(event) => {
                                        this.setState({ name: event.target.value})
                                    }} /><br/>
                                    {/* <input className="partyinputs" type="textfield" placeholder="Party Name" value={this.state.name}
                                    onChange={(event) => {
                                        this.setState({ name: event.target.value })
                                    }}/> */}
                                </Grid>
                                <Grid item sm={3} xs={12} className="partyDisplayBoxLine1">
                                    <TextField size="small" variant="outlined" className="partyinputs" value={this.state.telephone.slice(2,13)} type="textfield" label="telephone #" inputProps={{ maxLength: 10 }}
                                    onChange={(event) => {
                                        this.setState({ telephone: `+1${event.target.value}`})
                                    }}/>
                                    {/* <input className="partyinputs" type="textfield" placeholder="telephone #" value={this.state.telephone.slice(2,13)}
                                    onChange={(event) => {
                                        this.setState({ telephone: `+1${event.target.value}`})
                                    }}
                                    /> */}
                                </Grid>
                                <Grid item sm={2} xs={6}  className="partyDisplayBoxLine1">
                                <FormControl component="fieldset">
                                <FormGroup aria-label="Over 21" row>
                                <FormControlLabel
                                    control={<Checkbox color="primary" 
                                    checked={this.state.over21 ? true : false}
                                    value={this.state.over21 ? "true": "false"}
                                    onChange={(event) => {
                                        this.setState({ over21: event.target.checked})
                                    }}/>}
                                    label="Over 21?"
                                    labelPlacement="start"
                                    />
                                </FormGroup>
                                </FormControl>
                                    {/* <label>Over 21?   
                                    <input className="partyinputs" style={{ width: "auto"}}type="checkbox" placeholder="over 21?" checked={this.state.over21 ? true : false} value={this.state.over21 ? "true": "false"}
                                    onChange={(event) => {
                                        this.setState({ over21: event.target.checked})
                                    }}
                                    /></label> */}
                                </Grid>
                                <Grid item sm={1} xs={6} style={{ textAlign: "right"}} className="partyDisplayBoxLine1">
                                    <Button className="lineUpBtn" variant="contained"  id={this.state.seated === true || this.state.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{
                                                this.props.seatedUpdate(this.state.party)}}>
                                                {this.state.seated === false ? "Seat" : "Sat"}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container style={{justifyContent: "space-between"}}>
                                <Grid item sm={6} xs={12} className="partyDisplayBoxLine1">
                                    <TextField multiline={true} rows={1} size="small" variant="outlined" value={this.state.specialNotes}className="partyinputs"  label="Notes" inputProps={{ maxLength: 140 }}
                                    onChange={(event) => {
                                        this.setState({ specialNotes: event.target.value})
                                    }}
                                    />
                            {/* 
                            <label>Estimated Time?<br/>
                            <input className="partyinputs" type="time" placeholder="Estimated Mins til Seated" value={dayjs(this.state.timeArrived).format('h:mm a')}
                            onChange={(event) => {
                                this.setState({ timeEstimated: dayjs().add(event.target.value, 'minute')})
                            }}/></label><br/>
                            // <label>Time Seated?
                            // <input className="partyinputs" type="datetime-local" placeholder="Time Seated"
                            // onChange={(event) => {
                            //     this.setState({ timeSeated: new Date(event.target.value)})
                            // }}
                            /></label><br/> */}
                            {/* <textarea className="partyinputs"  placeholder="Special Notes" value={this.state.specialNotes}
                            onChange={(event) => {
                                this.setState({ specialNotes: event.target.value})
                            }}/> */}
                            </Grid>
                                <Grid item container className="partyDisplayBoxLine1"style={{justifyContent: "space-between", width: "100%"}} sm={6} xs={12}>
                                <Button variant="contained"  fullWidth={false}  id={this.state.seated === true || this.state.leftUnseated === true ? "seatedBtn" : "orangeBtn"} 
                                        onClick={() => this.props.changeEditStatus(this.props.party, this.props.index)}>Cancel</Button>

                                <Button variant="contained"  fullWidth={false} color="secondary" id={this.state.seated === true || this.state.leftUnseated === true ? "seatedBtn" : "orangeBtn"} type="submit" >Save</Button>
                                <Button variant="contained"  id={this.state.seated === true || this.state.leftUnseated === true ? "seatedBtn" : "orangeBtn"} onClick={() =>{this.props.leftUpdate(this.state.party)}}>{this.state.leftUnseated === false ? "Leaving" : "Left"}
                                </Button>
                                
                                <Button variant="contained" fullWidth={false}  id={this.state.seated === true || this.state.leftUnseated === true ? "seatedBtn" : "delete"} onClick={() => this.props.deleteParty(this.props.party)}>Delete</Button><br/>
                                </Grid>
                            </Grid>
                            </form>
                            </div>
         );
    }
}
 
export default EditParty;