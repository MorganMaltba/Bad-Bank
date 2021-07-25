import './App.css';
import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/icons/bank2.svg';

import NavBar from './components/navbar.js';
import AllData from './components/alldata.js';
import Balance from './components/balance.js';
import CreateAccount from './components/createaccount.js';
import Deposit from './components/deposit.js';
import Withdraw from './components/withdraw.js';
import Home from './components/home.js';
import Login from './components/login.js';


import {
  Switch,
  Route,
  HashRouter,
} from 'react-router-dom';

import UserContext from './components/user-context';

function App() {
  const context = React.useContext(UserContext);

  return (
    <div>
        <HashRouter>
            <NavBar/>
            <UserContext.Provider value={context}>
              <Switch>

                <Route path='/' exact>
                  <Home/>
                </Route>

                <Route path='/createaccount/'>
                  <CreateAccount/>
                </Route>

                <Route path='/login/'>
                  <Login/>
                </Route>

                <Route path='/balance/'>
                 <Balance/>
                </Route>

                <Route path='/withdraw/'> 
                   <Withdraw/>
                </Route>

                <Route path='/deposit/'>
                  <Deposit/>
                </Route>

                <Route path='/alldata/'>
                  <AllData/>
                </Route>

              </Switch>
            </UserContext.Provider>
           
        </HashRouter>
    </div>
  );
}

export default App;
