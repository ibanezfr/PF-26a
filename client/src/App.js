import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchCategories } from "./redux/actions/index";
// import ProductsCards from "./components/ProductsCards/ProductsCards.jsx";
// import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage.jsx";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
// Auth

// import { AuthProvider } from "./context/AuthContext";
import Details from "./components/Details/Details";
import NavBar from "./components/NavBar/NavBar";

import Profile from "./Pages/Account/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./components/Cart/Cart";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Footer from "./components/Footer/Footer";
import ProfileForm from "./components/ProfileForm/ProfileForm";

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
          <Route exact path="/" component={HomePage} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/search">
            <SearchProducts />
          </Route>
          <ProtectedRoutes>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/profile/form" component={ProfileForm} />
          </ProtectedRoutes>

          <Route path="/details/:id" component={Details} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
