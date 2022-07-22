// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import carrito from '../../images/carrito.png'
import Carrousel from '../Carousel/Carrousel';
import SearchBar from '../Search/Search';

function NavBar() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"><Link to='/cart'><img src={carrito} alt='not found' width='50px'/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><Link to=''>Inicio</Link></Nav.Link>
            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3"><Link to='/login'>Login</Link></NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                <Link to='/profile'>Perfil</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Carrousel/>
    </>
  );
}

export default NavBar;