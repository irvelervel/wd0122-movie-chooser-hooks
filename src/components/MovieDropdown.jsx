import { Form } from 'react-bootstrap'
// first question: do we need to interact with a local state, or lifecycle methods?
// the answer to both questions is no.
// let's write a functional component then!

const MovieDropdown = ({ movieTitle, handleMovieTitle }) => (
  <Form.Group>
    <Form.Label>Select a movie</Form.Label>
    <Form.Control
      as="select"
      value={movieTitle}
      onChange={(e) => handleMovieTitle(e.target.value)}
    >
      <option>Iron Man</option>
      <option>Black Widow</option>
      <option>Doctor Strange</option>
      <option>Spider Man</option>
      <option>Captain America</option>
    </Form.Control>
  </Form.Group>
)

export default MovieDropdown
