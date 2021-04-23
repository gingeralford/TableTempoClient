import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
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
    seated: false,
    leftUnseated: false,
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
        fetch(`${APIURL}/party/update/${party.id}`, {
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
            <div>Hello From Party Display
                {/* {this.displayParties} */}
                <div>{this.props.parties.map((party, index ) => 
                    {   
                    return(
                        <div key={party.id}>
                    
                            <p>{party.name}</p>
                            <p>{party.partyNum}</p>
                            <p>over 21? {party.over21 === true ? "yes" : "no"}</p>
                            <p>{party.telephone}</p>
                            <p>time arrived: {dayjs(party.timeArrived).format('dddd, MMMM D, YYYY h:mm A')}</p>
                            <p>time estimated: {dayjs(party.timeEstimated).format('dddd, MMMM D, YYYY h:mm A')}</p>
                            <p>{party.specialNotes}</p>
                            
                            <Button variant="contained"  fullWidth={false} color="secondary" id="wideBtn" >Edit</Button><br/>

                            <Button variant="contained"  fullWidth={false} color="secondary" id="wideBtn" onClick={() => this.deleteParty(party)}>Delete</Button><br/>

                            <hr/>
                        </div>
                    )
                })}
                </div>
            </div>
         );
    }
}
 
export default PartyDisplay;