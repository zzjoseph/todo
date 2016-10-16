import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';
import Items from './items';
import ListModal from './listModal';
import ItemModal from './itemModal';

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetchLists();
  }
  newList(e) {
    console.log("new list: " + $("#listName").val());
    e.preventDefault();
    $.ajax({
      url: "/api/lists",
      method: "POST",
      data: {name: $("#listName").val()},
      success: function(res) {
        this.fetchLists();
      }.bind(this)
    })
  }
  fetchLists() {
    $.ajax({
      url: "/api/lists",
      method: "GET",
      dataType: "json",
      success: function(lists) {
        if(lists.error) {
          this.props.router.push('/login');
        } else {
          if(lists.length > 0) {
            this.setState({lists: lists, selection: lists[0].id});
            $("#"+lists[0].id).addClass("active");
          } else {
            this.setState({lists: lists});
          }
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("error");
      }
    });
  }
  clickList(list_id) {
    console.log('click list');
    $(".active").removeClass("active");
    $("#"+list_id).addClass("active");
    this.setState({selection: list_id});
  }
  deleteList(list_id, e) {
    e.stopPropagation();
    console.log('delete list');
    $.ajax({
      url: '/api/lists/' + list_id,
      method: 'DELETE',
      dataType: 'json',
      success: function(res) {
        this.fetchLists();
      }.bind(this)
    })
  }
  newItems(e) {
    var currentSelect = this.state.selection;
    e.preventDefault();
    $.ajax({
      url: "/api/items",
      method: "POST",
      data: {list_id: currentSelect, description: $("#description").val(), due: $("#due").val().replace('T', ' ')+":00"},
      success: function(res) {
        this.setState({selection: currentSelect});
      }.bind(this)
    });
  }
  render() {
    var lists = [];
    if(this.state.lists) {
      lists = this.state.lists.map(function(list, index, arr) {
        return (
          <li role="presentation" id={list.id} key={list.id}>
            <a href="#" onClick={this.clickList.bind(this, list.id)}>
              <span className={"glyphicon glyphicon-star"}></span>{list.name}
              <span onClick={this.deleteList.bind(this, list.id)} style={{float: "right"}} className={"glyphicon glyphicon-trash"}></span>
            </a>
          </li>
        )
      }, this);
    }
    return (
      <div className="row">
        <div className="col-md-2 col-md-offset-2">
          <ul className="nav nav-pills nav-stacked">
            {lists}
            <li>
              <a href="#" data-toggle="modal" data-target="#listModal">
                <span className="glyphicon glyphicon-list-alt"></span>new list
              </a>
              <ListModal newList={this.newList.bind(this)}/>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#itemModal">
                <span className="glyphicon glyphicon-file"></span>new task
              </a>
              <ItemModal newItems={this.newItems.bind(this)} />
            </li>
            <li>
              <a href="/logout">
                <span className="glyphicon glyphicon-log-out"></span>logout
              </a>
            </li>
          </ul>
        </div>
        <Items list_id={this.state.selection} />
      </div>
    )
  }
}

export default withRouter(Lists);
