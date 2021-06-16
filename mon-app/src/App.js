import React, {  useState } from "react";
import { Route, Switch, BrowserRouter} from 'react-router-dom'
import Posts from './pages/articles/Posts'
import Account from './pages/users/account/Account'
import Register from './pages/users/register/Register'
import Login from './pages/users/login/Login'
import {hasAuthenticated} from './services/AuthApi'
import Auth from './context/Auth'
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { useDispatch } from "react-redux";
import { getUser } from './actions/user.actions'
import { getItem } from "./services/LocaleStorage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  let id = getItem("id")

  const dispatch = useDispatch();
  if (hasAuthenticated()) dispatch(getUser(id));

  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <AuthenticatedRoute path="/posts" component={Posts}/>
          </Switch>
      </BrowserRouter>
    </Auth.Provider>
  );
}

export default App;

