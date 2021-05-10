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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LineStyleIcon from '@material-ui/icons/LineStyle';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Favicon from '../assets/android-chrome-512x512.png';

export interface SiteNavProps {
  updateToken: Function,
  clearToken: React.MouseEventHandler<HTMLButtonElement>,
  token: string | null,
}
 
export interface SiteNavState {
  isDrawerOpened: boolean,
  token: string | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    // title: {
    //   flexGrow: 1,
    // },
    // //below added for drawer menu
    // list: {
    //   width: 250,
    // },
    // fullList: {
    //   width: 'auto',
    // },
    // sideNav: {
    //   marginTop: '-60px',
    //   zIndex: 3,
    //   marginLeft: '0px',
    //   position: 'fixed',
    // },
    // link: {
    //   color: 'black',
    //   textDecoration: 'none',
    // },
    paper: {
      background: 'white',
      color: '#707070',
      textDecoration: 'none',
      textTransform: 'none',
      fontFamily: 'Raleway, Arial',
    }
  }),
);

interface ILeftDrawer {
  isDrawerOpened: boolean,
  toggleDrawerStatus: Function,
  closeDrawer: Function
}

function LeftDrawer(props:ILeftDrawer) {
  const classes = useStyles();
  //need to make my own classes class for this item
  // const { isDrawerOpened } = props.state; 
  return(
    <div id="drawer">
    <Drawer
          variant="temporary"
          open={props.isDrawerOpened}
          onClose={() => {props.closeDrawer()}}
          classes={classes}
          >
          <div id="drawerInside">
          <Link to='/' className="sidebarLinks">
            <List>
              <ListItem button key='Waitlist'>
                <ListItemIcon><LineStyleIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Waitlist</Typography>} />
              </ListItem>
            </List>
          </Link>
          {/* Only shows link to /admin if admin=true */}
          {localStorage.getItem('admin') === "true" ? 
          <Link to='/admin' className="sidebarLinks" >
            <List>
              <ListItem button key='Admin'  >
                <ListItemIcon><SupervisorAccountIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Admin</Typography>} className="sidebarLinks" />
              </ListItem>
            </List>
          </Link>
          : "" }
          
          <Link to='/reports' className="sidebarLinks">
            <List>
              <ListItem button key='Reports'>
                <ListItemIcon><AssessmentIcon color="primary"/>
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Reports</Typography>} />
              </ListItem>
            </List>
          </Link>
          
            <Divider />
            <List>
            <ListItem key='Copyright'>
              <ListItemIcon><CopyrightIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body2">Ginger Alford 2021</Typography>} />
            </ListItem>
            </List>
          
          </div>
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

function ButtonAppBar(props: IButtonAppBar) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={ { backgroundColor: '#FFFFFF'}}>
        <Toolbar className="toolbarItems">

          {props.token == localStorage.getItem('token') ? 
          <div style={{ width: "60px"}}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {props.toggleDrawerStatus()}}>
            
            <MenuIcon />
            {/* Has to be direct call, not fat arrow function */}
            
          </IconButton></div>
          : <div style={{ width: "60px"}}></div>}
          <div>
          <Link to="/" style={{textDecoration: "none"}}><Typography variant="h1" id="appName">
          <img src={Favicon} height="25px" alt="hourglass icon"/>Table Tempo
          </Typography></Link></div>
          {props.token != localStorage.getItem('token') ? 
          <LoginModal 
            updateToken={props.updateToken}
            clearToken={props.clearToken}
            token={props.token}
          /> :
          <Button variant="contained" color="secondary" id="loginBtn" onClick={props.clearToken}
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
          token: props.token
         };
    }

    toggleDrawerStatus = () => {
      console.log('toggleDrawerStatus');
      this.setState({
        isDrawerOpened: true,
      })
      // console.log(this.state.isDrawerOpened)
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