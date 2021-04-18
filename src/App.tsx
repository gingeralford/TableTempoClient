import React from 'react';
import './App.css';
import SignUpSplash from './components/SignUpSplash';
import SiteNav from './components/SiteNav';
import {Route, Switch} from 'react-router-dom';

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
    body1: { 
      fontFamily: 'Raleway, Arial',
      fontSize: '1em',
      color: '#FFFFFF' }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },

});

interface IProps {
  
}

interface IState {
  sessionToken : String | null
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
  console.log(this.state.sessionToken);
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
      <SiteNav />
      <Switch>
      <Route exact path="/">
        <SignUpSplash 
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          token={this.state.sessionToken}
        />
      </Route>
      
      </Switch>
      </ThemeProvider>
    </div>
  )
}
}

// const App: React.FunctionComponent = () => {
//   return (
    
//     <div className="App">
//       <ThemeProvider theme={customTheme}>
//       <SiteNav />
//       <Switch>
//       <Route exact path="/"><SignUpSplash /></Route>
      
//       </Switch>
//       </ThemeProvider>
//     </div>
    
//   );
// }

export default App;
