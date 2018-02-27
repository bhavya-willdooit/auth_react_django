var React = require('react')
var ReactDOM = require('react-dom')
var axios = require('axios')
var maincss = require('../css/main.css')

import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DjangoCSRFToken from 'django-react-csrftoken';

class Login extends React.Component{

    constructor(props) {
      super(props);

      this.state = {
          username: '',
          password:'',
          show_invalid_creds:false,
          pw_len_wrong:false,
          pw_no_up:false,
          pw_no_lo:false,
          pw_no_sc: false,
          pw_no_num: false,
          email_not_valid:false
      }

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      }

      handleEmailChange(event){
        this.setState({username:event.target.value})
        var str = event.target.value

        if(str.search(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/) == -1)
        {
            this.setState({email_not_valid:true})
        }
        else{
            this.setState({email_not_valid:false})
        }
      }

      handlePasswordChange(event){
        this.setState({password:event.target.value})
        var str = event.target.value
        if (str.length < 8 || str.length > 20)
            {
                this.setState({pw_len_wrong:true})
            }
        else
            {this.setState({pw_len_wrong:false})}

        if (str.search(/\d/) == -1)
            {
                this.setState({pw_no_num:true})
            }
        else
            {this.setState({pw_no_num:false})}

        if (str.search(/[a-z]/) == -1)
            {
                this.setState({pw_no_lo:true})
            }
        else
            {this.setState({pw_no_lo:false})}

        if (str.search(/[A-Z]/) == -1)
            {
                this.setState({pw_no_up:true})
            }
        else
            {this.setState({pw_no_up:false})}

        if (str.search(/[\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1)
            {
                this.setState({pw_no_sc:true})
            }
        else {
            {this.setState({pw_no_sc:false})}
        }
      }

      handleSubmit(event){
          event.preventDefault();
          console.log(this.refs.token)
          axios({
            method: 'post',
            url: '/api/login_user',
            data: {
              username: this.state.username,
              password: this.state.password,
            },
          }).then((response) =>
              {
                  console.log(response.data.user_token)
                  //xios.get(response.data.uri)
                  if (response.data.login === "success"){
                      localStorage.token = response.data.user_token
                      localStorage.username = response.data.username
                      window.location.href = "/"

                  }
                  else{
                      this.setState({show_invalid_creds:true})
                  }

              }).catch(function (error) {
                console.log(error);
              });

      }

    render(){
        return(
            <div className="center-stuff">
            <form onSubmit={this.handleSubmit}>
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  onChange={this.handleEmailChange.bind(this)}
                />
                <br/>
                { this.state.email_not_valid ? <div>Not a valid email address.</div> : null }
                <br/>
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  onChange={this.handlePasswordChange.bind(this)}
                />
                <br/>

                { this.state.pw_no_lo ? <div>Need lower case letters in password.</div> : null }

                { this.state.pw_no_up ? <div>Need upper case letters in password.</div> : null }

                { this.state.pw_no_sc ? <div>Need atleast one special character in password.</div> : null }

                { this.state.pw_no_num ? <div>Need atleast one number in password.</div> : null }

                { this.state.pw_len_wrong ? <div>Password length needs to be between 8 and 20 characters.</div> : null }

                { this.state.show_invalid_creds ? <div>Invalid Login Details.</div> : null }
                <br/>
                <RaisedButton label="Login" primary={true} type="submit" value="Submit"/>
                </form>
            </div>

        )
    }
}

module.exports = Login;
