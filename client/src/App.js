import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './components/Home/Home.jsx';


function App() {
 
  return (<div className="App">
    <BrowserRouter>
    <Switch>
    <Route path="/home"component={Home}/>
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

