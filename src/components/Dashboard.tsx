import * as React from 'react';
import PartyCreate from './PartyCreate';
import PartyDisplay from './PartyDisplay';

export interface DashboardProps {
    token: string | null
}
 
export interface DashboardState {
    
}
 
class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
                <div id="dashboard">
                Hello from Dashboard
                <PartyCreate token={this.props.token}/>
                <PartyDisplay />
                
            </div>
            </>
         );
    }
}
 
export default Dashboard;