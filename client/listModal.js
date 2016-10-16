import React from 'react';
import $ from 'jquery';

class ListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="modal fade" id="listModal" tabIndex="-1" role="dialog" aria-labeledby="listModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="listModalLabel">New List</h4>
            </div>
            <div className="modal-body">
              <form className="form-inline">
                <div className="form-group" style={{width: "70%"}}>
                  <label className="sr-only" htmlFor="listName">Name</label>
                  <input type="text" id="listName" style={{width: "100%"}} placeholder="Enter list name" className="form-control" name="name"/>
                </div>
                <button onClick={this.props.newList} data-dismiss="modal" style={{float: "right"}} className="btn btn-submit">Create</button>
              </form>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListModal;
