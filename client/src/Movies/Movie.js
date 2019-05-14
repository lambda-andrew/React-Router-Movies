import React, { Component } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    console.log(this.props);
    console.log(this.props.data);
    console.log(this.props.save);
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.data.match.params.id;
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps){
    if(this.props.data.match.params.id !== newProps.data.match.params.id){
      this.fetchMovie(newProps.data.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.save;
    addToSavedList(this.state.movie)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return(
      <MovieCard movie={this.state.movie} save={this.saveMovie}/>
    )
  //   const { title, director, metascore, stars } = this.state.movie;
  //   return (
  //     <div className="save-wrapper">
  //       <div className="movie-card">
  //         <h2>{title}</h2>
  //         <div className="movie-director">
  //           Director: <em>{director}</em>
  //         </div>
  //         <div className="movie-metascore">
  //           Metascore: <strong>{metascore}</strong>
  //         </div>
  //         <h3>Actors</h3>

  //         {stars.map(star => (
  //           <div key={star} className="movie-star">
  //             {star}
  //           </div>
  //         ))}
  //       </div>
  //       <div className="save-button">Save</div>
  //     </div>
  //   );
  }
}
