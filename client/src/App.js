import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import { useEffect, useState, useSelector } from "react"
import { useDispatch, } from "react-redux"
import { fetchProducts } from './redux/actions/index'
import Desk from './components/Desk/Desk.jsx';
// import ProductsCards from './components/ProductsCards/ProductsCards.jsx';
import Nav from './components/Nav/Nav';
// import Pagination from './components/Pagination/Pagination.jsx'
import LandingPage from './components/LandingPage/LandingPage';
// console.log(fetchProducts)
import SearchProducts from './Pages/SearchProducts/SearchProducts'
import Details from './components/Details/Details';
import NavBar from './components/NavBar/NavBar';
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
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./Pages/Home/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
<<<<<<< HEAD
import Cart from './components/Cart/Cart';
=======
import Details from "./components/Details/Details";
// console.log(fetchProducts);
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



<<<<<<< HEAD
  return (<div className="App">
    <BrowserRouter>
    <NavBar/>
    <Switch>
=======
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/products">
            <Desk />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/search" exact>
            {/* <Nav /> */}
            <SearchProducts />
          </Route>
          <Route path="/profile" exact>
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          </Route>
          <Route path='/details/:id' component={Details}/>
<<<<<<< HEAD
        </Switch>
    </BrowserRouter>
  </div>
=======
          <Route path="/products">
            <Desk />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
>>>>>>> 5cfd2bd8960ab1e346f208ac514d1b1d2b655842
  );
}

export default App;

