import * as React from 'react';

export interface ReportsProps {
    
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
        <div>
            Hello from Reports
        </div> );
    }
}
 
export default Reports;