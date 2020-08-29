import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";


import { setMovies } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

class MainView extends React.Component {
  constructor() {
    super();

    this, state = {
      user: null,
    }
  }
  /*
    constructor() {
      super();
  
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null
      };
    }
  */

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }



  getMovies(token) {
    axios.get('https://harry-heroku-23.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }



  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorge.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <MoviesList movies={movies} />;

          }} />
          <Route path="/register" render={() => <RegistrationView />} />


          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route exact path="/genres/:name" render={() => <GenreView movie={movies.find(m => m.genre === match.params.name)} />} />
          <Route exact path="/directors/:name" render={() => <DirectorView movie={movies.find(m => m.director === match.params.name)} />} />
        </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);

