var React = require('react')
var ReactDOM = require('react-dom')
var Login = require('./Login')
var UserGreeting = require('./UserGreeting')
var auth  = require('./auth')

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn)
    {
        return (<UserGreeting/>);
    }
    return (<Login />);
}

class Index extends React.Component{
  render(){
    return(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Greeting isLoggedIn={!!localStorage.token} />,
    </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('react-app'));
