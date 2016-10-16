import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <img src="/images/todo.jpg"/>
          </div>
        </div>
        <div id="login_signup" className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="row">
              <Link to="/login" className="col-sm-4 col-sm-offset-1 btn btn-lg btn-primary">Login</Link>
              <span className="col-sm-2 text-center"></span>
              <Link to="/signup" className="col-sm-4 btn btn-lg btn-primary">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
