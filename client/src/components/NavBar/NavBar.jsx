import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import carrito from "../../images/carrito.png";
import SearchBar from "../Search/Search";
import "./NavBar.css";
import { useDispatch } from "react-redux";
import { setSearchStatus } from "../../redux/actions";
import Swal from 'sweetalert2'


function NavBar() {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const history = useHistory();

  function resetFilterOrderSearch() {
    dispatch(setSearchStatus(false));
    localStorage.removeItem("filter"); //ver que onda aca
    localStorage.removeItem("order");
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  function handleFavs() {
    user ? history.push("/favorites") : Swal.fire({
      title: 'No estás logueado',
      text: "Para poder guardar los productos en tu lista de favoritos debes loguearte primero!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iniciar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })
  } 

  return (
    <Navbar className="NavBar" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/cart">
            <img src={carrito} alt="not found" width="20px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              className="navText"
              href="/"
              onClick={resetFilterOrderSearch()}
            >
              Inicio
            </Nav.Link>
            <NavDropdown title="Usuario" id="basic-nav-dropdown">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Nav.Link className="navText" href="/login">
                  Login
                </Nav.Link>
              )}
              <Nav.Link href="/profile" className="navText">
                Perfil
              </Nav.Link>
              <Nav.Link href="/admin/home" className="navText">
                Admin Dashboard
              </Nav.Link>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          <Nav.Link className="navText" onClick={() => handleFavs()}>
            Favoritos
          </Nav.Link>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
