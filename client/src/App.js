import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchCategories } from "./redux/actions/index";
import HomePage from "./Pages/HomePage/HomePage.jsx";
// import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import Details from "./Pages/Details/Details";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./Pages/Account/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./components/Cart/Cart";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
// import Footer from "./components/Footer/Footer";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import Carrousel from "./components/Carousel/Carrousel";
import HomeAdmin from "./components/AdminComponents/HomeAdmin/HomeAdmin";
import ProductCreationForm from "./components/ProductCreationForm/ProductCreationForm";
import UserList from "./components/AdminComponents/UserList/UserList";
import List from "./components/AdminComponents/List/List";
import Purchase from "./components/Purchase/Purchase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Carrousel />
            <HomePage />
          </Route>
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/search">
            <Carrousel />
            <HomePage />
          </Route>
          <Route path="/purchase" component={Purchase} />
          <Route path="/details/:id" component={Details} />

          {/* AUTHENTICATION ROUTES usuarios y eso */}

          {/* Admin ROUTES */}

          <Route path="/admin/home" component={HomeAdmin} />
          <Route path="/admin/users" component={UserList} />
          <Route path="/admin/products" component={List} />
          <Route path="/admin/creation" component={ProductCreationForm} />
          {/* <Footer /> */}

          <ProtectedRoutes>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/profile/form" component={ProfileForm} />
          </ProtectedRoutes>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
