import * as React from 'react';
import APIURL from "../helpers/environment";
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
var dayjs = require('dayjs');

export interface EditStaffProps {
    index: number,
    staff: {
        active: boolean,
        admin: boolean,
        createdAt: Date,
        email: string,
        id: number,
        password: string,
        restaurantId: number,
        uniqueCode: string,
        updatedAt: Date,
        isEditing: boolean,
        isMain: boolean
    },
    removeNulls: Function,
    fetchStaff: Function,
    changeEditStatus: Function,
    deleteStaff: Function
}
 
export interface EditStaffState {
    staff: {
        active: boolean,
        admin: boolean,
        createdAt: Date,
        email: string,
        id: number,
        password: string,
        restaurantId: number,
        uniqueCode: string,
        updatedAt: Date,
        isEditing: boolean,
        isMain: boolean
    },
    active: boolean,
    admin: boolean,
    email: string,
    id: number,
    password: string,
    restaurantId: number,
    uniqueCode: string,
    updatedAt: Date,
    isEditing: boolean,
    isMain: boolean
}

export interface IStaff {
    active: boolean,
    admin: boolean,
    createdAt: Date,
    email: string,
    id: number,
    password: string,
    restaurantId: number,
    uniqueCode: string,
    updatedAt: Date,
    isEditing: boolean,
    isMain: boolean
}

 
class EditStaff extends React.Component<EditStaffProps, EditStaffState> {
    constructor(props: EditStaffProps) {
        super(props);

        this.state = {  
            staff: {
                active: props.staff.active,
                admin: props.staff.admin,
                email: props.staff.email,
                id: props.staff.id,
                password: props.staff.password,
                restaurantId: props.staff.restaurantId,
                uniqueCode: props.staff.uniqueCode,
                updatedAt: props.staff.updatedAt,
                createdAt: props.staff.createdAt,
                isEditing: props.staff.isEditing,
                isMain: props.staff.isMain
            },
            active: props.staff.active,
            admin: props.staff.admin,
            email: props.staff.email,
            id: props.staff.id,
            password: props.staff.password,
            restaurantId: props.staff.restaurantId,
            uniqueCode: props.staff.uniqueCode,
            updatedAt: props.staff.updatedAt,
            isEditing: props.staff.isEditing,
            isMain: props.staff.isMain
         };
    }

    updateStaff = (e: React.FormEvent, staff: IStaff) => {
        e.preventDefault();
        console.log(`updating ${staff.id}`);
        console.log(staff)
        fetch(`${APIURL}/staff/update/${staff.id}`, 
        {
            body: JSON.stringify({ staff: { 
                email: staff.email,
                password: staff.password, 
                admin: staff.admin,
                active: staff.active
             } }),
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.removeNulls(localStorage.getItem('token'))
            }),
          })
            .then((res) => res.json())
            .then((res) => {
                console.log('Staff Updated')
                this.props.fetchStaff();
            })
            .catch((err) => console.log(err));
    }
    render() { 
        return ( 
        <div>
            <p><Typography variant="body2">  
                        <span>{this.props.staff.email}</span><br/>
                        <span>signed up: {dayjs(this.props.staff.createdAt).format('MM/DD/YYYY')}</span>
                        <form onSubmit={(e) => {
                            this.setState({ staff: {
                                active: this.state.active,
                                admin: this.state.admin,
                                password: this.state.password,
                                email: this.props.staff.email,
                                id: this.props.staff.id,
                                restaurantId: this.props.staff.restaurantId,
                                uniqueCode: this.props.staff.uniqueCode,
                                updatedAt: this.props.staff.updatedAt,
                                createdAt: this.props.staff.createdAt,
                                isEditing: this.state.isEditing,
                                isMain: this.props.staff.isMain
                            }}, () => {
                                this.updateStaff(e, this.state.staff);
                                this.props.changeEditStatus(this.props.staff, this.props.index);
                            })}}>
                        <p>
                        
                        <FormControlLabel 
                            control={<Checkbox color="secondary" checked={this.state.admin ? true : false} onChange={(event) => {
                                this.setState({ admin: event.target.checked}, () => console.log(this.state.admin))
                            }}/>}
                            label={<Typography variant="body2" style={{ fontSize: "14px"}}>Admin</Typography>}
                            labelPlacement="start"
                            /><br/>
                        <FormControlLabel 
                            control={<Checkbox color="secondary" checked={this.state.active ? true : false} onChange={(event) => {
                                this.setState({ active: event.target.checked}, () => console.log(this.state.active))
                            }}/>}
                            label={<Typography variant="body2" style={{ fontSize: "14px"}}>Active</Typography>}
                            labelPlacement="start"
                            /></p>
                        <p> 
                        <Button variant="contained" color="secondary" type="submit" >Save</Button></p>
                        <p> 
                        <Button variant="contained" id="delete" onClick={() => this.props.deleteStaff(this.props.staff)}>Delete</Button></p>
                        <hr/></form>
                        </Typography>
                    </p>
        </div> );
    }
}
 
export default EditStaff;