import { Typography } from '@material-ui/core';
import * as React from 'react';
import APIURL from "../helpers/environment";
var dayjs = require('dayjs');

export interface AdminProps {
    token: string | null
}
 
export interface AdminState {
    loading: boolean
    staffList: staffMember[]
}

export interface staffMember {
    active: boolean,
    admin: boolean,
    createdAt: Date,
    email: string,
    id: number,
    password: string,
    restaurantId: number,
    uniqueCode: string,
    updatedAt: Date
}

 
class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        const staffPlaceholder = [{
            active: false,
            admin: false,
            createdAt: new Date(),
            email: "",
            id: 0,
            password: "",
            restaurantId: 0,
            uniqueCode: "",
            updatedAt: new Date()
        }]

        this.state = { 
            loading: true,
            staffList: [...staffPlaceholder]
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

    componentDidMount() {
        this.fetchStaff();
    }

    fetchStaff = () => {
        this.setState({ loading: true})
        fetch(`${APIURL}/staff/`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
            
          })
            .then((res) => res.json())
            .then((staff) => {
              this.setState({ loading: false})
              console.log(staff)
              this.setState({ staffList: staff})
            //   console.log("state array",this.state.parties);
            })
            .catch((err) => console.log(err));
    };

    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
            <div id="admin">
                <h2><Typography variant="h2">Staff</Typography></h2>
                {this.state.staffList.map((staff, index) => {
                    return (
                    <p><Typography variant="body2">  
                        <span>{staff.email}</span>
                        <span>{staff.admin ? "Admin": "Not Admin"}</span>
                        <span>{staff.active ? "Active" : "Not Active"}</span><br/>
                        <span>signed up: {dayjs(staff.createdAt).format('MM/DD/YYYY')}</span>
                        </Typography>
                    </p>  
                    )
                })}
            </div>
            </> );
    }
}
 
export default Admin;