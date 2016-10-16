import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  login(e) {
    e.preventDefault();
    $.ajax({
      url: '/login',
      method: 'post',
      dataType: 'json',
      data: {
        username: $("#username").val(),
        password: $("#password").val()
      },
      success: function(data) {
        if(data.error) {
          this.setState(data);
        } else {
          this.props.router.push('/lists');
        }
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
        <div className="row">
          <p className="text-danger col-md-4 col-md-offset-4">{this.state.error}</p>
        </div>
        <div className="row">
          <form className="col-md-4 col-md-offset-4">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password"/>
            </div>
            <button type="submit" onClick={this.login.bind(this)} className="btn btn-primary">Submit</button>
            <span className="col-sm-offset-1">Do not have an account? <Link to="/signup">signup</Link></span>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
