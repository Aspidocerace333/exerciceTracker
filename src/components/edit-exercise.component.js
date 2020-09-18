import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getUsersQuery, getExerciseQuery, getExercisesQuery, updateExerciseQuery } from '../queries/queries'

class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      duration: 0,
      date: new Date(),
      userId: ''
    }
  }

  displayUsers() {
    //var data = this.props.getUsersQuery;
    console.log(this.props);
    /*if(data.loading){
      return(<option>Loading Athors ...</option>);
    }else{
      return data.users.map(user => {
        return(<option key={user.id} value={user.id}>{user.username}</option>);
      });
    }*/
  }


  /*onSubmit(e) {
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
  }*/

  render() {
    return (
      <div>
        <h1>Edit Exercise Log</h1>

      </div>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(getExerciseQuery, {
    name: "getExerciseQuery",
    options: (props) => {
      return {
        variables: {
          id: props.exerciseId
        }
      }
    }
  }),
  graphql(getExercisesQuery, { name: "getExercisesQuery" }),
  graphql(updateExerciseQuery, { name: "updateExerciseQuery" })
)(EditExercise);
