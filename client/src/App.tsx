import axios from 'axios';
import React, {
  useEffect,
  useState
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { AppContext } from './context/AppContext';

import "./components/css/min/Page.min.css";
import "./components/css/min/error.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/navbar/navbar';
import Error404 from './pages/errors/404';
import Register from './pages/auth/register';
import Login from './pages/auth/login';

export default function App() {
  useEffect(() => {
    init();
  }, []);

  const [isInitiated, setIsInitiated] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  const logout = () => {
    setUser(null);
    localStorage.setItem('val_token', '');
  }

  const init = async () => {
    const token = localStorage.getItem('val_token');
    const { data } = await axios.get(`/api/user/init?val_token=${token}`);
    setUser(data.user);
    setIsInitiated(true);
  }

  return (
    <div>
      {isInitiated && (
        <AppContext.Provider value={{ user, logout }}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <h1>Hello World</h1>
              </Route>
              {!user ? (
                <Route exact path="/auth/register">
                  <Register />
                </Route>
              ) : (
                {}
              )}
              {!user ? (
                <Route exact path="/auth/login">
                  <Login />
                </Route>
              ) : (
                {}
              )}
              <Route>
                <Error404 />
              </Route>
            </Switch>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  )
}
