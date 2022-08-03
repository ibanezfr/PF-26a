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
import { useTranslation } from 'react-i18next';

const lngs = {
  es: { nativeName: 'Español' },
  en: { nativeName: 'English' },
}

function NavBar() {
  const { t, i18n } = useTranslation();

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
              {t('navbar.home')}
            </Nav.Link>
            <NavDropdown title={t('navbar.navdropdown')} id="basic-nav-dropdown">
              {user ? (
                <button onClick={handleLogout}>{t('logout')}</button>
              ) : (
                <Nav.Link className="navText" href="/login">
                  {t('navbar.login')}
                </Nav.Link>
              )}
              <Nav.Link href="/profile" className="navText">
                {t('navbar.profile')}
              </Nav.Link>
              <Nav.Link href="/admin/home" className="navText">
                {t('navbar.admin-dashboard')}
              </Nav.Link>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
          {
            Object.keys(lngs).map((lng) => (
              <button type='submit' key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>{lngs[lng].nativeName}</button>
            ))
          }
          <Nav.Link className="navText" onClick={() => handleFavs()}>
            {t('navbar.favorites')}
          </Nav.Link>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
