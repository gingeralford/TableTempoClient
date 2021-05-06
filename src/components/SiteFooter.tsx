import * as React from 'react';
import Typography from '@material-ui/core/Typography';

export interface SiteFooterProps {
    
}
 
export interface SiteFooterState {
    
}
 
class SiteFooter extends React.Component<SiteFooterProps, SiteFooterState> {
    constructor(props: SiteFooterProps) {
        super(props);
        this.state = {  };
    }
    render() { 
        return ( <div id="footer">
            <Typography variant="body2">&copy; Ginger Alford 2021</Typography>
        </div> );
    }
}
 
export default SiteFooter;