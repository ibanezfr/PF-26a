import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import carrito from "../../images/carrito.png";
import SearchBar from "../Search/Search";
import './NavBar.css'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand ><Link to='/cart'><img src={carrito} alt='not found' width='30px' /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className='navText' to=''>Inicio</Link>
            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              <Link className='navText' to='/login'>Login</Link>
              <Link to='/profile' className='navText'>Perfil</Link>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
