import React, { Component } from 'react';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a href="/exercises-list" className="navbar-brand">ExerciceTracker</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <a href="/exercises-list" className="nav-link"> Exercises</a>
            </li>
            <li className="navbar-item">
              <a href="/create-exercise" className="nav-link">Create Exercise Log</a>
            </li>
            <li className="navbar-item">
              <a href="/create-user" className="nav-link">Create User</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}
