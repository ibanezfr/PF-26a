import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, } from "react-redux"
import { fetchProducts } from './redux/actions/index'
import ProductsCards from './components/ProductsCards/ProductsCards.jsx';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import SearchProducts from "./Pages/SearchProducts/SearchProducts.jsx"
console.log(fetchProducts)

function App() {
  let dispatch = useDispatch()

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
        <Route path="/products" exact>
          <Nav />
          <ProductsCards />
        </Route>
        
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;

