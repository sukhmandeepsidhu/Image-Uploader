import { Container, Navbar, Nav } from 'react-bootstrap';
import './navBarStyles.css';

const NavBar = ({ left, right }) => {
  return (
    <Navbar data-bs-theme='light' sticky='top' className='primaryNav'>
      <Container>
        <Navbar.Brand>{left}</Navbar.Brand>
        <Nav>{right}</Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
