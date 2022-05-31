import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import MovieDetails from './components/MovieDetails'
import MovieDropdown from './components/MovieDropdown'

const App = () => {
  const [movieTitle, setMovieTitle] = useState('Iron Man')

  // state = {
  //   movieTitle: 'Iron Man',
  // }

  const handleMovieTitle = (newMovieTitle) => {
    // this.setState({
    //   movieTitle: newMovieTitle,
    // })
    setMovieTitle(newMovieTitle)
  }

  // this fires again when I'm changing movieTitle from MovieDropdown!
  return (
    <div className="App">
      <Container className="mt-2 text-light">
        <h1>Movie Chooser App!</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <MovieDropdown
              movieTitle={movieTitle} // read access
              handleMovieTitle={handleMovieTitle} // write access
            />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <MovieDetails movieTitle={movieTitle} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
