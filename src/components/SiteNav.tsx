import React from 'react';
import LoginModal from './LoginModal';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export interface SiteNavProps {
  updateToken: Function,
  clearToken: React.MouseEventHandler<HTMLButtonElement>,
  token: string | null,
}
 
export interface SiteNavState {
  isDrawerOpened: boolean,
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
    //below added for drawer menu
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    sideNav: {
      marginTop: '-60px',
      zIndex: 3,
      marginLeft: '0px',
      position: 'fixed',
    },
    link: {
      color: 'black',
      textDecoration: 'none',
    }
  }),
);

interface ILeftDrawer {
  isDrawerOpened: boolean,
  toggleDrawerStatus: Function,
  closeDrawer: Function
}

function LeftDrawer(props:ILeftDrawer) {
  // const classes = useStyles();
  // const { isDrawerOpened } = props.state; 
  return(
    <div id="sideNav">
    <Drawer
          variant="temporary"
          open={props.isDrawerOpened}
          onClose={() => {props.closeDrawer()}}
        >
          <Link to='/about'>
            <List>
              <ListItem button key='About Us'>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary='About Us' />
              </ListItem>
            </List>
          </Link>
          <Link to='/contact' >
          <List>
            <ListItem button key='Contact Us'>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary='Contact Us' />
            </ListItem>
            </List>
          </Link>
        </Drawer>
        </div>
  )
}

interface IButtonAppBar {
  toggleDrawerStatus: Function,
  updateToken: Function,
  clearToken: React.MouseEventHandler<HTMLButtonElement>,
  token: string | null
}

//TODO: Was using any...can take this out if everything keeps working
function ButtonAppBar(props: IButtonAppBar) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={ { backgroundColor: '#FFFFFF'}}>
        <Toolbar className="toolbarItems">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <div>
            <MenuIcon onClick={() => {props.toggleDrawerStatus()}}/>
            {/* Has to be direct call, not fat arrow function */}
            </div>
          </IconButton>
          <div>
          <Link to="/" style={{textDecoration: "none"}}><Typography variant="h1" className={classes.title}>
            Table Tempo
          </Typography></Link></div>
          {props.token != localStorage.getItem('token') ? 
          // <Link to="/login" style={{textDecoration: 'none'}}>
          // <Button variant="contained" color="secondary" style={{ fontFamily: "Abril Fatface, Times new Roman", fontSize: "1.2em", padding: "4px 8px"}}
          // >Log In</Button></Link> : 
          <LoginModal 
            updateToken={props.updateToken}
            clearToken={props.clearToken}
            token={props.token}
          /> :
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
        this.state = {  
          isDrawerOpened: false,
         };
    }

    toggleDrawerStatus = () => {
      console.log('toggleDrawerStatus');
      this.setState({
        isDrawerOpened: true,
      })
      console.log(this.state.isDrawerOpened)
    }

    closeDrawer = () => {
      this.setState({
        isDrawerOpened: false,
      })
    }

    
    render() { 
      
        return ( 
        <div>

          <ButtonAppBar token={this.props.token} 
          updateToken={this.props.updateToken} 
          clearToken={this.props.clearToken}
          toggleDrawerStatus={this.toggleDrawerStatus}
          />
          <LeftDrawer toggleDrawerStatus={this.toggleDrawerStatus}
          closeDrawer={this.closeDrawer} isDrawerOpened={this.state.isDrawerOpened}/>

        </div> );
    }
}
 
export default SiteNav;