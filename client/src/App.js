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


function App() {

  return (
    <HashRouter>
      <div id='grid' className='main'>
        <NavBar />
        <div className='container'>
          <Switch>

            <Route path='/' exact component={Home} />
            <Route path='/createaccount/' component={CreateAccount} />
            <Route path='/login/' component={Login} />
            <Route path='/balance/' component={Balance} />
            <Route path='/withdraw/' component={Withdraw} />
            <Route path='/deposit/' component={Deposit} />
            <Route path='/alldata/' component={AllData} />

          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;