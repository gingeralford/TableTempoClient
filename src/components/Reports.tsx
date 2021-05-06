import * as React from 'react';

export interface ReportsProps {
    token: string | null
}
 
export interface ReportsState {
    
}
 
class Reports extends React.Component<ReportsProps, ReportsState> {
    constructor(props: ReportsProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <>
            <div style={{backgroundColor: '#FFF3C2', position: 'fixed', top: "0px", left: '0px', minHeight: '100vh', width: '100%', }} ></div>
            <div id="admin">
                Hello from Reports
            </div>
            </> );
    }
}
 
export default Reports;