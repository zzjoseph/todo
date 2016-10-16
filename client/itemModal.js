import React from 'react';
import $ from 'jquery';

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="modal fade" id="itemModal" tabIndex="-1" role="dialog" aria-labeledby="itemModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="itemModalLabel">New Task</h4>
            </div>
            <div className="modal-body">
              <form className="form" method="post" action="/api/items">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" id="description" placeholder="Enter task description" className="form-control" name="description"/>
                </div>
                <div className="form-group">
                  <label htmlFor="due">Due</label>
                  <input type="datetime-local" id="due" name="due" className="form-control" />
                </div>
                <button onClick={this.props.newItems} data-dismiss="modal" className="btn btn-submit">Create</button>
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

export default ItemModal;
