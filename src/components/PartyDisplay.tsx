import * as React from 'react';
import APIURL from "../helpers/environment";
var dayjs = require('dayjs');


export interface PartyDisplayProps {
    
}
 
export interface PartyDisplayState {
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
    parties: {
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
        timeArrived: Date
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
            timeEstimated: dayjs(),
            timeSeated: "",
            seated: false,
            leftUnseated: false,
            specialNotes: "",
            staffId: 0,
            restaurantId: 0,
            uniqueCode: "",
            parties: [{
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
                uniqueCode: "",
                timeArrived: dayjs()
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
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((parties) => {
              this.setState({ parties: parties})
              console.log(parties);
            });
        };

    componentDidMount() {
        this.fetchParties();
    }

    componentDidUpdate(prevProps: any[], prevState: any) {
        if(prevState.parties !== this.state.parties){
            this.displayParties()
        }
    }
    
    displayParties = () => { return (this.state.parties.map((party, index ) => 
        {   
            return(
                <ul key={index}>
                    <li>{party.name}</li>
                    <li>{party.partyNum}</li>
                    <li>{party.over21}</li>
                    <li>{party.telephone}</li>
                    <li>{party.timeArrived}</li>
                    <li>{party.timeEstimated}</li>
                    <li>{party.specialNotes}</li>
                </ul>
            )
        }))}

    render() { 
        //TODO: Doesn't actually display anything
        return ( 
            <div>Hello From Party Display
                {this.displayParties}
                
            
            </div>
         );
    }
}
 
export default PartyDisplay;