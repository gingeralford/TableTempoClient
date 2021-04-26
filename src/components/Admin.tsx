import * as React from 'react';

export interface AdminProps {
    
}
 
export interface AdminState {
    
}
 
class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
        <div>
            Hello from Admin
        </div> );
    }
}
 
export default Admin;