import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect, useState, useSelector } from "react"
import { useDispatch, } from "react-redux"
import { fetchProducts } from './redux/actions/index'
import Desk from './components/Desk/Desk.jsx';
// import ProductsCards from './components/ProductsCards/ProductsCards.jsx';
import Nav from './components/Nav/Nav';
// import Pagination from './components/Pagination/Pagination.jsx'
import LandingPage from './components/LandingPage/LandingPage';
import SearchProducts from "./Pages/SearchProducts/SearchProducts.jsx"
import Details from './components/Details/Details';
console.log(fetchProducts)

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



  return (<div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/home" exact>
          <Nav />
        </Route>
        <Route path="/search" exact>         
          <Nav />
          <SearchProducts />         
        </Route>       
        <Route path="/products">
          <Desk />
        </Route>
        <Route path='/details/:id' component={Details}/>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;

