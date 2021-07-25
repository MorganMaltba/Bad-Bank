import React from 'react';
import bootstrap from 'bootstrap';

function NavBar() {
  // Child component to be generated inside parent Spa component
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient nav">
      <div class="container-fluid">

        <a className="navbar-brand"
          href="/"
          data-toggle="tooltip"
          data-placement="right"
          title="home page"
        >Bad Bank</a>

        <svg id='bank-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-bank2" viewBox="0 0 16 16">
          <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
        </svg>

        <button className="navbar-toggler fl" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <a className="nav-link"
                data-toggle="tooltip"
                data-html="true"
                data-placement="right"
                title="create a new account"
                href="#/createaccount/"
              >Create Account</a>
            </li>

            <li className="nav-item">
              <a className="nav-link"
                href="#/login/"
                data-toggle="tooltip"
                data-placement="right"
                title="login to your account"
              >Log-In</a>
            </li>

            <li className="nav-item">
              <a className="nav-link"
                href="#/balance/"
                data-toggle="tooltip"
                data-placement="right"
                title="view account balance"
              >Balance</a>
            </li>

            <li className="nav-item">
              <a className="nav-link"
                href="#/withdraw/"
                data-toggle="tooltip"
                data-placement="right"
                title="withdraw funds from your account"
              >Withdraw</a>
            </li>

            <li className="nav-item">
              <a className="nav-link"
                href="#/deposit/"
                data-toggle="tooltip"
                data-placement="right"
                title="deposit funds into your account"
              >Deposit</a>
            </li>

            <li className="nav-item">
              <a className="nav-link"
                href="#/alldata/"
                data-toggle="tooltip"
                data-placement="right"
                title="view all user data"
              >All Data</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;