import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SavedList extends Component {
  constructor (props) {
    super(props);
    console.log(props)
  }
  
  backHome = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => (
          <NavLink className="saved-movie" to={`/movies/${movie.id}`}>{movie.title}</NavLink>
        ))}
          <div className="home-button" onClick={this.backHome}>Home</div>
      </div>
    );
  }
}
