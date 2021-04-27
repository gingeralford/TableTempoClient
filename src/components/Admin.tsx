import * as React from 'react';

export interface AdminProps {
    token: string | null
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
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
            <div id="admin">
                Hello from Admin
            </div>
            </> );
    }
}
 
export default Admin;