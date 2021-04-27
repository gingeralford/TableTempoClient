import * as React from 'react';
import PartyCreate from './PartyCreate';
import PartyDisplay from './PartyDisplay';
import APIURL from "../helpers/environment";

export interface DashboardProps {
    token: string | null
}
 
export interface DashboardState {
    // updating: string,
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
 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {  
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

    // componentDidUpdate(prevProps: any[], prevState: any) {
    //     if(prevState.parties !== this.state.parties){
    //         console.log("component did update")
    //     }
    // }
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

    fetchParties = () => {
        fetch(`${APIURL}/party/todayall`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((parties) => {
              this.setState({ parties: parties})
              console.log("state array",this.state.parties);
            })
            .catch((err) => console.log(err));
    };

    componentDidMount() {
        this.fetchParties();
    }


    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <div id="dashboard">
                <PartyCreate token={this.props.token}  parties={this.state.parties} fetchParties={this.fetchParties}/>
                <PartyDisplay  parties={this.state.parties} fetchParties={this.fetchParties}/>
                
            </div>
            </>
         );
    }
}
 
export default Dashboard;