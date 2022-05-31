import { useState, useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap'

// 1) initial movie state: null
// 2) first render: nothing shows up, because the card is bound to the truthyness of this.state.movie
// 3) componentDidMount fires fetchMovieDetails, which grabs the movie details and sets the state
// 4) because of the setState, render() fires again!
// 5) this time this.state.movie is NOT NULL, and therefore the card is shown!

const MovieDetails = ({ movieTitle }) => {
  // state = {
  //   movie: null,
  // }

  const [movie, setMovie] = useState(null)

  // componentDidMount = () => {
  //   // a lifecycle method performed just after the initial render()
  //   // this is perfect for fetching some data initially, in a non blocking way
  //   this.fetchMovieDetails()
  // }

  useEffect(() => {
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + movieTitle
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data.Search[0])
        // now it's time to put our result into a state property!
        // this.setState({
        //   movie: data.Search[0],
        // })
        setMovie(data.Search[0])
      } else {
        console.log('something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // MovieDetails is aware of the value in the dropdown!
  // App is remembering the select value in its state, and it's passing
  // that value down to MovieDetails as a prop! (called movieTitle)

  // componentDidUpdate = (prevProps, prevState) => {
  //   // this is another lifecycle method that will trigger every time there's
  //   // a change in the state or in the props of THIS component!
  //   // let's see if componentDidUpdate wakes up when I receive a new
  //   // this.props.movieTitle (so when a new movie is selected in the dropdown...)
  //   console.log('componentDidUpdate fired!')
  //   // componentDidUpdate wakes up upon every state/props change!
  //   // this.fetchMovieDetails()
  //   // infinite loop :( why?
  //   // because setting the state in fetchMovieDetails() ALSO wake componentDidUpdate up again!
  //   // solution? we should find a way to wake up componentDidUpdate when THE PROPS CHANGE,
  //   // NOT when the STATE is changing... I want to set the state once and that's it!
  //   if (prevProps.movieTitle !== this.props.movieTitle) {
  //     // oh, we have detected a change in the prop movieTitle!
  //     this.fetchMovieDetails()
  //     //   this will NOT performed again when a state change happens... :)
  //   }
  //   // MOST LIKELY YOUR COMPONENTDIDUPDATE WILL NEED A CONDITION!
  // }

  useEffect(() => {
    fetchMovieDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle])

  // render wakes up upon every state/props change!
  // it behaves like componentDidUpdate!
  return (
    <div>
      {/* the ternary operator in JSX works in the exact same
          way as it works in JS! */}
      {movie ? (
        <Card className="text-dark">
          <Card.Img variant="top" src={movie.Poster} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              {movie.Year} - {movie.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>
          <Spinner variant="info" animation="border" />
        </div>
      )}
    </div>
  )
}

export default MovieDetails
