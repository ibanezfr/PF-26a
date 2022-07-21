import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/actions/index";
import ProductsCards from "./components/ProductsCards/ProductsCards.jsx";
import LandingPage from "./components/LandingPage/LandingPage";
import Desk from "./components/Desk/Desk.jsx";
import SearchProducts from "./Pages/SearchProducts/SearchProducts";
// Auth

import { AuthProvider } from "./context/AuthContext";
import Nav from './components/Nav/Nav';
// import Pagination from './components/Pagination/Pagination.jsx'
import Details from './components/Details/Details';
import NavBar from './components/NavBar/NavBar';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./Pages/Home/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Cart from './components/Cart/Cart';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



  return (<div className="App">
    <BrowserRouter>
    <NavBar/>
    <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          {/* <Route path="/">
            <NavBar/>
          </Route> */}
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
        </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;

