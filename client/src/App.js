import './App.css';
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
    dispatch(fetchProducts());
    dispatch(fetchCategories())
  }, [dispatch])



  return (<div className="App">
    <BrowserRouter>
    <NavBar/>
    <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/search">
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

