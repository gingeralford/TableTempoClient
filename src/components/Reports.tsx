import * as React from 'react';
import DatePicker from "react-datepicker";
import { Typography } from '@material-ui/core';
import { addDays } from 'date-fns';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
var dayjs = require('dayjs');


export interface ReportsProps {
    token: string | null
}
 
export interface ReportsState {
    startDate: any,
    endDate: any,
    loading: boolean,
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
 
class Reports extends React.Component<ReportsProps, ReportsState> {
    constructor(props: ReportsProps) {
        super(props);
        this.state = { 
            startDate: new Date(),
            endDate: new Date(),
            loading: true,
            parties: [{
                id: 0,
                name: "",
                partyNum: 0,
                telephone: "Look at me",
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
//Probably can remove
    // onChange= (dates: any) => 
    //     { const [start, end] = dates;
    //         this.setState({ startDate: start});
    //         this.setState({ endDate: end})
    //     }

    daypick = () => {
        return (
            <>
            <div>
                <DatePicker placeholderText="start date" selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date})} startDate={this.state.startDate} /></div>
            <div>
                <DatePicker placeholderText="end date" selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date})} endDate={this.state.endDate} maxDate={addDays(this.state.startDate, 30)}/>
            </div>
          </>
        );
      };
    
    // ExampleCustomInput = React.forwardRef<HTMLInputElement>(
    //     ({ value, onClick }, ref) => (
    //       <button className="example-custom-input" onClick={onClick} ref={ref}>
    //         {value}
    //       </button>
    //     ),
    //   );
    // DatePickerInput = ({ onClick, ...props }) => (
    //     <div onClick={onClick}></div>
    // );

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

    makeStart5am = (startTime: Date) => {
            startTime.setHours(5,0,1)
            console.log("5am start time", startTime)
        };
    

    makeEnd5am = (endTime: Date) => {
            endTime.setHours(5,0,1);
            endTime.setDate(endTime.getDate() + 1);
            console.log("5am end time",endTime)
        };
    

    fetchPartyRange = () => {
    this.setState({ startDate: this.makeStart5am(this.state.startDate)})
    this.setState({ endDate: this.makeEnd5am(this.state.endDate)})
    // console.log("start",this.state.startDate)
    // console.log("end",this.state.endDate)
    this.setState({ loading: true})
    fetch(`${APIURL}/party/daterange/?endDate=${this.state.endDate.toISOString()}&startDate=${this.state.startDate.toISOString()}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.removeNulls(localStorage.getItem('token'))
        }),
        
        })
        .then((res) => res.json())
        .then((parties) => {
            this.setState({ parties: parties})
            this.setState({ loading: false})
        //   console.log("state array",this.state.parties);
        })
        .catch((err) => console.log(err));
    };

    render() { 
        return ( 
            <>
                <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <div id="admin">
                    <h2><Typography variant="h2">View Parties by Date</Typography></h2>
                    <Typography variant="body2">
                        <p>
                        {this.daypick()}
                        {this.state.startDate !== undefined && this.state.endDate !== undefined ? 
                        <Button id="orangeBtn" onClick={() => this.fetchPartyRange()}>Get Parties</Button> : ""}
                        </p>
                        {this.state.parties[0].id !== 0  ? this.state.parties.map((party, index ) => {   
                            return(
                            <div key={index}>
                                <span>{party.name}</span> <span>{dayjs(party.timeArrived).format('MM/DD/YYYY h:mm a')}</span>
                            </div>)}): ""}
                    </Typography>
                </div>
            </> );
    }
}
 
export default Reports;