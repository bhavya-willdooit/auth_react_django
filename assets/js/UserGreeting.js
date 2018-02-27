var React = require('react')
var ReactDOM = require('react-dom')
var maincss = require('../css/main.css')
var auth = require('./auth')
var axios = require('axios')
import RaisedButton from 'material-ui/RaisedButton';

class UserGreeting extends React.Component{

    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this)
      }

    handleLogout(){

        console.log(this.refs.token)
        axios({
            method: 'post',
            url:'/api/logout_user',
            withCredentials: true,
            data: {username:localStorage.username,
                    token: localStorage.token},
            })
            .then((response) => {
                if (response.data.logout === "success")
                {
                    auth.logout()
                    window.location.href = "/"
                }

                })
                .catch(function (error) {});
        this.forceUpdate()
    }

    render()
    {
        return(

            <div>
                <div className="center-stuff">
                    <h1 >
                        Hello Admin!
                    </h1>

                </div>
                <br/>
                <br/>

                <div className="center-stuff">
                    <RaisedButton label="Logout" primary={true} onClick={this.handleLogout}/>
                </div>
            </div>
        )
    }
}

module.exports = UserGreeting;
