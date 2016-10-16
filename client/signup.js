import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  signup(e) {
    e.preventDefault();
    $.ajax({
      url: '/signup',
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
        <form className="col-md-4 col-md-offset-4" method="post">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password"/>
          </div>
          <button type="submit" onClick={this.signup.bind(this)} className="btn btn-primary">Submit</button>
          <span className="col-sm-offset-1">Already have an account? <Link to="/login">login</Link></span>
        </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Signup);
