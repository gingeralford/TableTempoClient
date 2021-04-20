import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';

export interface SiteNavProps {
  updateToken: Function,
  clearToken: Function,
  token: string | null,
}
 
export interface SiteNavState {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);


//TODO: Can't use any!
function ButtonAppBar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={ { backgroundColor: '#FFFFFF'}}>
        <Toolbar className="toolbarItems">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div>
          <Link to="/" style={{textDecoration: "none"}}><Typography variant="h1" className={classes.title}>
            Table Tempo
          </Typography></Link></div>
          {props.token != localStorage.getItem('token') ? 
          <Link to="/login" style={{textDecoration: 'none'}}>
          <Button variant="contained" color="secondary" style={{ fontFamily: "Abril Fatface, Times new Roman", fontSize: "1.2em", padding: "4px 8px"}}
          >Log In</Button></Link> : 
          <Button variant="contained" color="secondary" style={{ fontFamily: "Abril Fatface, Times new Roman", fontSize: "1.2em", padding: "4px 8px"}} onClick={props.clearToken}
          >Log Out</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

 
class SiteNav extends React.Component<SiteNavProps, SiteNavState> {
    constructor(props: SiteNavProps) {
        super(props);
        this.state = {   };
    }
    
    render() { 
        return ( 
        <div>
          <ButtonAppBar token={this.props.token} updateToken={this.props.updateToken} clearToken={this.props.clearToken}/>

        </div> );
    }
}
 
export default SiteNav;