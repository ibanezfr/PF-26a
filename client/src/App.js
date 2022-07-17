import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react"
import { useDispatch, } from "react-redux"
import { fetchTickets } from './redux/actions/index'
import TicketsCards from './components/TicketsCards/TicketsCards.jsx';
import Nav from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
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
        <Route path="/tickets">
          <Nav />
          <TicketsCards />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;

