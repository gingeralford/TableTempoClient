import * as React from 'react';
import DatePicker from "react-datepicker";
import { Typography } from '@material-ui/core';
import { addDays } from 'date-fns';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
var dayjs = require('dayjs');


export interface ReportsProps {
    token: string | null
}
 
export interface ReportsState {
    startDate: any,
    endDate: any,
    name: string,
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
            name: "",
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


    daypick = () => {
        return (
            <>
            <div className="daypick">
                <DatePicker className="daypickInput" placeholderText="start date" selected={this.state.startDate} onChange={(date) => this.setState({ startDate: date})} startDate={this.state.startDate} /></div>
            <div className="daypick">
                <DatePicker className="daypickInput" placeholderText="end date" selected={this.state.endDate} onChange={(date) => this.setState({ endDate: date})} endDate={this.state.endDate} maxDate={addDays(this.state.startDate, 30)}/>
            </div>
          </>
        );
      };
    

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
            // console.log("5am start time", startTime)
    };

    makeEnd5am = (endTime: Date) => {
            endTime.setHours(5,0,1);
            endTime.setDate(endTime.getDate() + 1);
            // console.log("5am end time",endTime)
    };

    formatPhoneNumber = (phoneNumberString: string) => {
        phoneNumberString = phoneNumberString.trim();
        let newNumber: string = phoneNumberString.slice(2,5)+ '-' +phoneNumberString.slice(6,9)+'-'+phoneNumberString.slice(7,11)
        return newNumber;
    }

    fetchPartyRange = () => {
    this.setState({ startDate: this.makeStart5am(this.state.startDate)})
    this.setState({ endDate: this.makeEnd5am(this.state.endDate)})
    console.log("start",this.state.startDate)
    console.log("end",this.state.endDate)
    this.setState({ loading: true})
    console.log(`${APIURL}/party/daterange/?endDate=${this.state.endDate.toISOString()}&startDate=${this.state.startDate.toISOString()}`)
    fetch(`${APIURL}/party/daterange/?endDate=${this.state.endDate.toISOString()}&startDate=${this.state.startDate.toISOString()}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: this.removeNulls(localStorage.getItem('token'))
        }),
        
        })
        .then((res) => res.json())
        .then((parties) => {
            if(parties.length > 0) {
                this.setState({ parties: parties})
            }
            this.setState({ loading: false})
        //   console.log("state array",this.state.parties);
        })
        .catch((err) => console.log(err));
    };

    fetchByName = () => {
        let trimmedName = this.state.name.trim()
        this.setState({ name: trimmedName})
        this.setState({ loading: true})
        fetch(`${APIURL}/party/byname/?name=${this.state.name}`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
            
            })
            .then((res) => res.json())
            .then((parties) => {
                if(parties.length > 0) {
                    this.setState({ parties: parties})
                }
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
                        {this.state.startDate !== 0 && this.state.endDate !== undefined ? 
                        <Button id="orangeBtn" className="fullBtn" variant="contained" onClick={() => this.fetchPartyRange()}>Search by Dates</Button> : <Button className="fullBtn" variant="contained" id="orangeBtn" disabled >Search by Dates</Button>}
                        </p>
                        <p><input className="daypickInput" placeholder="Party Name" type="textfield"  maxLength={40} onChange={(event) => {
                        this.setState({ name: event.target.value})
                        }} /><br/></p>
                        <p><Button id="orangeBtn" className="fullBtn" variant="contained" onClick={() => this.fetchByName()}>Search by Name</Button ></p>
                        <div id="tableOverflow">
                            <table id="reportTable">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>#</th>
                                <th>Phone #</th>
                                <th>Arrived</th>
                                <th>Est. Wait</th>
                                <th>Actual Wait</th>
                                <th>Left?</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.parties[0].id !== 0  ?
                            this.state.parties.map((party, index ) => {   
                                let timeArrived = dayjs(party.timeArrived)
                                let timeSeated = dayjs(party.timeSeated)
                                let timeEstimated = dayjs(party.timeEstimated)
                            return(
                            <tr key={index}>
                                <td>{dayjs(party.timeArrived).format('MM/DD/YY')}</td>
                                <td>{party.name}</td> 
                                <td>{party.partyNum}</td>
                                <td>{this.formatPhoneNumber(party.telephone)}</td>
                                <td>{dayjs(party.timeArrived).format('hh:mm a')}</td>
                                <td>{timeEstimated.diff(timeArrived, 'minute') +1} mins</td>
                                <td>{party.seated ? timeSeated.diff(timeArrived, 'minute')+" mins": "pending"} </td>
                                <td className={party.leftUnseated ? "unseatedParty": ""} >{party.leftUnseated ? "yes" : "no"}</td>
                            </tr>)}): ""}
                            </tbody>
                            </table></div>
                    </Typography>
                </div>
            </> );
    }
}
 
export default Reports;