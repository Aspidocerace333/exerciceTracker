import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getUserQuery, addUserMutation } from '../queries/queries'

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addUserMutation({
      variables:{
        username: this.state.username
      },
      refetchQueries: [{ query: getUserQuery}]
    });
  }

  render() {
    return (
      <div>
      <h1>Create New User</h1>
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
            required
            className="form-control"
            onChange={(e) => this.setState({username: e.target.value})}
            />
        </div>

        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>

      </form>
      </div>
    );
  }
}

export default compose(
  graphql(addUserMutation, {name: "addUserMutation"}),
  graphql(getUserQuery, {name: "getUserQuery"})
)(CreateUser);
