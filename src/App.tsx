import React from 'react';
import './App.css';
import SignUpSplash from './components/SignUpSplash';
import SiteNav from './components/SiteNav';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import StaffCreate from './components/StaffCreate';
import {Route, Switch} from 'react-router-dom';
import Admin from './components/Admin';
import Typography from '@material-ui/core/Typography';
import SiteFooter from './components/SiteFooter';
import Reports from './components/Reports';


//MATERIAL-UI
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

//Making Theme to be used throughout
const customTheme = createMuiTheme({
  //theme settings here
  spacing: 5,
  palette: {
    primary: {main: "#FFD639", dark: "#FBAF00"}, //yellow/orange
    secondary: {main: "#007CBE"}, //blue
    error: { main: "#FFF3C2"}, //blonde
    warning: {main: "#9A423B"}, //rusty red
    info: { main: "#FFFFFF"}, //white
    success: { main: "#707070"} //gray
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    h1: { 
      fontFamily: 'Abril Fatface',
      fontSize: '2em',
      color: '#707070'
    },
    h2: {
      fontFamily: 'Abril Fatface',
      fontSize: '1.2em',
      color: '#007CBE'
    },
    body1: { 
      fontFamily: 'Raleway, Arial',
      fontSize: '.9em',
      fontWeight: 700,
      color: '#FFFFFF' 
    },
    body2: {
      fontFamily: 'Raleway, Arial',
      fontSize: '.9em',
      fontWeight: 700,
      color: '#707070'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontFamily: 'Raleway, Arial'
      },
    },
    MuiLink: {
      root: {
        underline: 'none',
        textTransform: 'none',
        color: '#707070'
      }
    },
    MuiListItemText: {
      root: {
      color: "#707070"
      }
    }
    }
  },

);

interface IProps {
  
}

interface IState {
  sessionToken : string | null
}

class App extends React.Component<IProps, IState>{
  constructor(props: IProps){
    super(props);
    this.state = {
      sessionToken : "",
    }
}

updateToken = (newToken: string) => {
  localStorage.setItem("token", newToken);
  this.setState({ sessionToken: newToken});
  // console.log(this.state.sessionToken);
  console.log('Token updated');
};

clearToken = () => {
  localStorage.clear();
  this.setState({ sessionToken: ""});
  console.log("Token cleared and Logged out");
};

componentDidMount(){
  if (localStorage.getItem("token")) {
    this.setState({ sessionToken: localStorage.getItem("token")
  })
}
}

render(){
  return(
    <div className="App">
      <ThemeProvider theme={customTheme}>
      <SiteNav 
        updateToken={this.updateToken}
        clearToken={this.clearToken}
        token={this.state.sessionToken}
      />
      <Switch>
      <Route exact path="/">
        {this.state.sessionToken == localStorage.getItem('token') ? <Dashboard token={this.state.sessionToken}/> : 
        <SignUpSplash 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
        /> }
      </Route>
      <Route exact path="/login">
        {this.state.sessionToken == localStorage.getItem('token') ?
          <Login 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
          /> : <SignUpSplash 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
        />}
      </Route>
      <Route exact path="/admin">
        {this.state.sessionToken == localStorage.getItem('token') ?
          <Admin 
          token={this.state.sessionToken}
          /> : 
          <SignUpSplash 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
        />}
      </Route>
      <Route exact path="/reports">
        {this.state.sessionToken == localStorage.getItem('token') ?
        <Reports 
        token={this.state.sessionToken}
        /> : <SignUpSplash 
        updateToken={this.updateToken}
        clearToken={this.clearToken}
        token={this.state.sessionToken}
      />}</Route>
      <Route path="/staff/:uuid">
        {this.state.sessionToken == localStorage.getItem('token') ?
          <StaffCreate 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
          /> : <SignUpSplash 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
        />}
        </Route>

      </Switch>
      
      {/* <SiteFooter /> */}
      </ThemeProvider>
    </div>
  )
}
}

export default App;
