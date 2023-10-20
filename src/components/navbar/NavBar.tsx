import React, { ReactNode } from 'react';
import './navBarStyles.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

interface NavBarProps {
  left: ReactNode;  
  right: ReactNode; 
}

const NavBar = ({left,right}: NavBarProps) => {
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
