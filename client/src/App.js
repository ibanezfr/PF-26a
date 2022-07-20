import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, } from "react-redux"
import { fetchProducts } from './redux/actions/index'
import ProductsCards from './components/ProductsCards/ProductsCards.jsx';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import Details from './components/Details/Details';
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
        <Route path="/products">
          <Nav />
          <ProductsCards />
        </Route>
        <Route path='/details/:id' component={Details}/>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;

