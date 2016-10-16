import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchItems(this.props.list_id);
  }
  fetchItems(list_id) {
    if(list_id) {
      $.ajax({
        url: "/api/lists/" + list_id,
        method: "GET",
        dataType: "json",
        success: function(items) {
          if(items.error) {
            this.props.router.push('/login');
          } else {
            this.setState({items: items});
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("error");
        }
      });
    }
  }
  toggleFinish(item_id) {
    console.log(document.getElementById("itemFinish"+item_id).checked);
    $.ajax({
      url: "api/items/" + item_id,
      method: "PUT",
      contentType: "json",
      data: JSON.stringify({finished: document.getElementById("itemFinish"+item_id).checked}),
      dataType: "json",
      success: function(res) {
        console.log(res);
      }
    });
  }
  deleteItem(item_id) {
    $.ajax({
      url: '/api/items/' + item_id,
      method: 'DELETE',
      dataType: 'json',
      success: function(res) {
        this.fetchItems(this.props.list_id);
      }.bind(this)
    });
  }
  toggleDelete(item_id) {
    $("#deleteItem"+item_id).toggleClass("noDisplay");
  }
  componentWillReceiveProps(nextProps) {
    this.fetchItems(nextProps.list_id);
  }
  render() {
    var items = [];
    if(this.state.items) {
      items = this.state.items.map(function(item, index, arr) {
        var due = new Date(item.due);
        var start = new Date(item.created_at);
        var now = new Date();
        var total = due.getTime() - start.getTime();
        var elapse = now.getTime() - start.getTime();
        var percent = Math.round(elapse * 100 / total);
        return (
          <button key={item.id} onMouseEnter={this.toggleDelete.bind(this, item.id)} onMouseLeave={this.toggleDelete.bind(this, item.id)} className="list-group-item">
            <h4>{item.description}
              <span style={{float: "right"}}>
                <input onChange={this.toggleFinish.bind(this, item.id)} defaultChecked={item.finished} type="checkbox" id={"itemFinish"+item.id}/>
              </span>
            </h4>
            <p>Due: {item.due.split(/T/)[0]} at {item.due.split(/T|\./)[1]}</p>
            <div className="progress">
              <div className="progress-bar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" role="progressbar" style={{"minWidth": "2em", width: percent + "%"}}>
                {percent + "%"}
              </div>
            </div>
            <a style={{float: "right"}} onClick={this.deleteItem.bind(this, item.id)} id={"deleteItem"+item.id} className={"noDisplay glyphicon glyphicon-trash"}></a>
          </button>
        )
      }, this);
    }
    return (
        <div className="list-group col-md-5 col-md-offset-1">
          {items}
        </div>
    )
  }
}

export default withRouter(Items);
