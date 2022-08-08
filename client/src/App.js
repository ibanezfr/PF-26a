import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchCategories } from "./redux/actions/index";
import HomePage from "./Pages/HomePage/HomePage.jsx";
// import SearchProducts from "./Pages/SearchProducts/SearchProducts";
import Details from "./Pages/Details/Details";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./Pages/Account/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./components/Cart/Cart";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Footer from "./components/Footer/Footer";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import Carrousel from "./components/Carousel/Carrousel";
import HomeAdmin from "./components/AdminComponents/HomeAdmin/HomeAdmin";
import ProductCreationForm from "./components/ProductCreationForm/ProductCreationForm";
import UserList from "./components/AdminComponents/UserList/UserList";

import Purchase from "./components/Purchase/Purchase";
import Favorites from "./Pages/Favs/Favs";

import ProductsAdmin from "./components/AdminComponents/productsAdmin/ProductsAdmin";
import AllCategories from "./components/Categories/AllCategories";
import EditCategories from "./components/Categories/EditCategories";

import UpdateProd from "./components/AdminComponents/productsAdmin/UpdateProd/UpdateProd";
import NewCategory from "./components/Categories/NewCategory";
import Answers from "./components/AdminComponents/Answers/Answers";
import PurchaseInfo from "./components/PurchaseInfo/PurchaseInfo";
import SellOrders from "./components/AdminComponents/SellOrders/SellOrders";
import Review from "./components/Review/Review";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Carrousel />
            <HomePage />
          </Route>

          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/search">
            <Carrousel />
            <HomePage />
          </Route>
          <Route path="/details/:id" component={Details} />

          {/* AUTHENTICATION ROUTES usuarios y eso */}

          {/* Admin ROUTES */}

          <Route path="/admin/home" component={HomeAdmin} />
          <Route path="/admin/users" component={UserList} />
          <Route path="/admin/products" component={ProductsAdmin} />
          <Route path="/admin/orders" component={SellOrders} />

          <Route path="/products/:id" component={UpdateProd} />

          <Route path="/admin/creation" component={ProductCreationForm} />
          <Route path="/admin/categoria/nueva" exact component={NewCategory} />
          <Route
            path="/admin/categorias/:id"
            exact
            component={EditCategories}
          />
          <Route path="/admin/categorias" exact component={AllCategories} />
          <Route path="/admin/qas" component={Answers} />

          <ProtectedRoutes>
            <Route path="/purchase" component={Purchase} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/purchases" component={PurchaseInfo}/>
            <Route path="/review/:id" component={Review}/>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/profile/form" component={ProfileForm} />
          </ProtectedRoutes>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
