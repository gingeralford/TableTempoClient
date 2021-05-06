import { Typography } from '@material-ui/core';
import * as React from 'react';
import EditStaff from '../components/EditStaff';
import APIURL from "../helpers/environment";
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
var dayjs = require('dayjs');

export interface AdminProps {
    token: string | null
}
 
export interface AdminState {
    loading: boolean,
    admin: boolean,
    active: boolean,
    staffList: staffPlusLocalVars[]
}

type localVars = {
    isEditing: boolean;
    isMain: boolean;
}

type staffPlusLocalVars = localVars & staffMember;

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
            updatedAt: new Date(),
            isEditing: false,
            isMain: false
        }]

        this.state = { 
            loading: true,
            admin: false,
            active: false,
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

    changeEditStatus = (staff: staffMember, index: number) => {
        this.setState({ staffList: 
        this.state.staffList.map((staff, i) => (index === i) ? {...staff, isEditing: !staff.isEditing }: staff) })
        // console.log("edit function",this.state.parties)
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

    deleteStaff = (staff: staffMember) => {
        console.log(`deleting ${staff.id}`);
        fetch(`${APIURL}/staff/delete/${staff.id}`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log('Staff Member Deleted')
                this.fetchStaff();
                
            })
            .catch((err) => console.log(err));
    }



    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
            <div id="admin">
                <h2><Typography variant="h2">Manage Staff</Typography></h2>
                {this.state.staffList.map((staff, index) => {
                    return (
                        <div key={index}>
                        {staff.isEditing ? 
                        <EditStaff 
                            index={index}
                            staff={staff} 
                            removeNulls={this.removeNulls} 
                            fetchStaff={this.fetchStaff}
                            changeEditStatus={this.changeEditStatus}
                            deleteStaff={this.deleteStaff}
                            /> :
                        <p><Typography variant="body2">  
                        <span>{staff.email}</span><br/>
                        <span>signed up: {dayjs(staff.createdAt).format('MM/DD/YYYY')}</span>
                        <p>
                        <FormControlLabel 
                            control={<Checkbox color="secondary" checked={staff.admin ? true : false} disabled={true}/>}
                            label={<Typography variant="body2" style={{ fontSize: "14px"}}>Admin</Typography>}
                            labelPlacement="start"
                            /><br/>
                        <FormControlLabel 
                            control={<Checkbox color="secondary" checked={staff.active ? true : false} disabled={true}/>}
                            label={<Typography variant="body2" style={{ fontSize: "14px"}}>Active</Typography>}
                            labelPlacement="start"
                            /></p>
                        <p> 
                        <Button variant="contained" color="secondary" onClick={() => this.changeEditStatus(staff, index)}>Edit</Button></p>
                        {/* <p> 
                        <Button variant="contained" color="secondary" onClick={() => this.deleteStaff(staff)}>Delete</Button></p> */}
                        <hr/>
                        </Typography>
                    </p> }</div>
                    )
                })}
                <h2><Typography variant="h2">Add New Staff</Typography></h2>
                <Typography variant="body2"><p>Send your employees the following link to create their account and password. The link is custom to your account and will automatically link them to this restaurant.</p>

                <Link to={`/staff/${this.state.staffList[0].uniqueCode}`}><span id="staffURL">{`${APIURL}/staff/${this.state.staffList[0].uniqueCode}`}</span></Link></Typography>
            </div>
            </> );
    }
}
 
export default Admin;