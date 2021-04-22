import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
var dayjs = require('dayjs');


export interface PartyDisplayProps {
    
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

    //FETCH WORKS!
    fetchParties = () => {
        fetch(`${APIURL}/party/today`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "appspancation/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((parties) => {
              this.setState({ parties: parties})
              console.log("state array",this.state.parties);
            });
        };

    componentDidMount() {
        this.fetchParties();
    }

    // componentDidUpdate(prevProps: any[], prevState: any) {
    //     if(prevState.parties !== this.state.parties){
    //         console.log("component did update",this.state.parties)
    //     }
    // }
    //TODO: have single prop in Dashboard that is sent to partycreate, that updates, and is a prop to partyDisplay too? that will trigger reload?
    
    // displayParties = () => { return (this.state.parties.map((party, index ) => 
    //     {   
    //         return(
    //             <ul key={index}>
    //                 <p>{party.name}</p>
    //                 <p>{party.partyNum}</p>
    //                 <p>{party.over21}</p>
    //                 <p>{party.telephone}</p>
    //                 <p>{party.timeArrived}</p>
    //                 <p>{party.timeEstimated}</p>
    //                 <p>{party.specialNotes}</p>
    //             </ul>
    //         )
    //     }))}

    //TODO: how to get the party name to the function?? do I have to make an interface?
    deleteParty = (party: object) => {
        fetch(`${APIURL}/party/delete/${party}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                if(res === 1){
                console.log('Party Deleted')
                // this.fetchParties();
                }
            })
            .catch((err) => console.log(err));
    }

    render() { 
        return ( 
            <div>Hello From Party Display
                {/* {this.displayParties} */}
                <div>{this.state.parties.map((party, index ) => 
        {   
            return(
                <div key={party.id}>
                    
                    <p>{party.name}</p>
                    <p>{party.partyNum}</p>
                    <p>{party.over21 == true ? "true" : "false"}</p>
                    <p>{party.telephone}</p>
                    <p>time arrived: {dayjs(party.timeArrived).format('dddd, MMMM D, YYYY h:mm A')}</p>
                    <p>time estimated: {dayjs(party.timeEstimated).format('dddd, MMMM D, YYYY h:mm A')}</p>
                    <p>{party.specialNotes}</p>
                    
                    {/* This is auto-deleting immediately
                    <Button variant="contained"  fullWidth={false} color="secondary" id="wideBtn" onClick={this.deleteParty}>Done</Button><br/> */}

                    <hr/>
                </div>
            )
        })}</div>
            
            </div>
         );
    }
}
 
export default PartyDisplay;