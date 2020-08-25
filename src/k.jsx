import React from 'react';
import axios from 'axios';


class Test extends React.Component {
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://harry-heroku-23.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        alert(error);
      });
  }


  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    // if (!movies) return <div />;

    return (
      alert(1)
    );
  }


}

export default Test;