import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/actions/index";
import ProductsCards from "./components/ProductsCards/ProductsCards.jsx";
import Nav from "./components/Nav/Nav";
import LandingPage from "./components/LandingPage/LandingPage";
import Desk from "./components/Desk/Desk.jsx";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
// Auth

import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./Pages/Home/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
// console.log(fetchProducts);

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/home">
            <Nav/>
          </Route>
          <Route path="/search" exact>
            <Nav />
            <SearchProducts />
          </Route>
          <Route path="/profile" exact>
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          </Route>

          <Route path="/products">
            <Desk />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
