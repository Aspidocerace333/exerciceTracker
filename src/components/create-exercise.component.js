import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getUsersQuery,  getExercisesQuery, addExerciseMutation } from '../queries/queries'

class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      duration: 0,
      date: new Date(),
      userId: ''
    }
  }

  displayUsers(){
    var data = this.props.getUsersQuery;
    //console.log(this.props);
    if(data.loading){
      return(<option>Loading Athors ...</option>);
    }else{
      return data.users.map(user => {
        return(<option key={user.id} value={user.id}>{user.username}</option>);
      });
    }
  }

  onSubmit(e) {
    console.log('STATE: ', this.state);
    e.preventDefault();
    this.props.addExerciseMutation({
          variables:{
            description: this.state.description,
            duration: Number(this.state.duration),
            date: this.state.date,
            userId: this.state.userId
          },
          refetchQueries: [{query: getExercisesQuery}]
        });

    //window.location = '/';
  }

  render() {
    return (
      <div>
        <h1>Create New Exercise Log</h1>
        <form onSubmit={this.onSubmit.bind(this)}>

          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              onChange={(e) => this.setState({userId: e.target.value})}>
              <option>
                Select User
              </option>
              { this.displayUsers() }
              </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              onChange={(e) => this.setState({description: e.target.value})}
              />
          </div>

          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input type="number"
              required
              className="form-control"
              onChange={(e) => this.setState({duration: e.target.value})}
              />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={(e) => this.setState({date: e})}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery"}),
  graphql(addExerciseMutation, {name: "addExerciseMutation"}
  )
)(CreateExercise);
