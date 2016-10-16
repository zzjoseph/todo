import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Home from './home';
import Signup from './signup';
import Login from './login';
import Lists from './lists';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="signup" component={Signup}/>
      <Route path="login" component={Login}/>
      <Route path="lists" component={Lists}>
      </Route>
    </Route>
  </Router>
), document.getElementById('main'));
