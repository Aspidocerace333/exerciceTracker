import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getExercisesQuery, deleteExerciseQuery } from '../queries/queries'


class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayExercises() {
    var data = this.props.getExercisesQuery;
    //console.log('PROPS: ' ,this.props);
    if (data.loading) {
      return (<tr><td><div> Loading Exercises ..</div></td></tr>);
    } else {
      return data.exercises.map(exercise => {

        return (
          <tr key={exercise.id}>
            <td>{exercise.user.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
              <button className="btn btn-danger" onClick={() => this.deleteExercise(exercise.id)
                //props.deleteExercise(props.exercise.id, props.propsko)

              }>delete</button>

            </td>
          </tr>
        );
      })
    }
  }

  /*updateExercise(id){
    console.log(this.props);
    return this.setState({selected: id});
  }*/

  deleteExercise(id) {
    //console.log('PROPS ', this.props);
    return this.props.deleteExerciseQuery({
      variables: {
        id: id
      },
      refetchQueries: [{ query: getExercisesQuery }]
    });
    //console.log('propskoooooooooo ', data);

  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.displayExercises()}
          </tbody>
        </table>

      </div>

    );

  }
}

export default compose(
  graphql(getExercisesQuery, { name: "getExercisesQuery" }),
  graphql(deleteExerciseQuery, { name: "deleteExerciseQuery" })
)(ExercisesList);
