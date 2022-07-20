import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react"
import { useDispatch, } from "react-redux"
import { fetchProducts } from './redux/actions/index'
import ProductsCards from './components/ProductsCards/ProductsCards.jsx';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import Details from './components/Details/Details';
console.log(fetchProducts)
=======
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
import Login from "./components/LogIn/Login";
import Register from "./components/Register/Register";
import Profile from "./Pages/Home/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
console.log(fetchProducts);
>>>>>>> b8cabc29d8a9cf93a427d14bbcb69e6ea0bf70f6

function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

<<<<<<< HEAD
  return (<div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/home" exact>
          <Nav />
        </Route>
        <Route path="/products">
          <Nav />
          <ProductsCards />
        </Route>
        <Route path='/details/:id' component={Details}/>
      </Switch>
    </BrowserRouter>
  </div>
=======
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
>>>>>>> b8cabc29d8a9cf93a427d14bbcb69e6ea0bf70f6
  );
}

export default App;
