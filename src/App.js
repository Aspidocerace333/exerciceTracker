import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:5000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Navbar />
          <br/>
          <Route path="/" exact component={ExercisesList} />
          <Route path="/exercises-list" exact component={ExercisesList} />
          <Route path="/edit-exrcise" component={EditExercise} />
          <Route path="/create-exercise" component={CreateExercise} />
          <Route path="/create-user" component={CreateUser} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
