import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context';
import photo from './images/vault.jpg';

function Deposit() {
  const context = React.useContext(UserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState(context.users[0].balance);
  const [valid, setValid] = React.useState(false);
  const [deposit, setDeposit] = React.useState('');


  function handleChange(event) {
    if (event.target.value < 0) {
      setValid(false);
      setStatus('Error: Enter valid amount.')
      setTimeout(() => setStatus(''), 3000);
      return;
    } else {
      setValid(true);
      setDeposit(Number(event.target.value));
    }
  };

  function handleDeposit(event) {
    if (deposit > 0) {
      let newTotal = balance + deposit;
      context.users[0].balance = newTotal;
      setBalance(newTotal);
      setShow(false);
    }
  };

  function clearForm() {
    setShow(true);
    setValid(false);
    setDeposit('');
  };

  if (context.users[0].logged === true) {
    return (
      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          status={status}
          header="Deposit"
          title={show && "Stash your cash here!"}
          text={show && "Maintenance fees waived with qualifying deposits."}
          body={show ? (

            <div className="mb-3">
              <h3>Balance: ${balance}</h3>
              <input type="number"
                id='deposit'
                className="form-control"
                placeholder="Enter Amount"
                value={deposit}
                onChange={handleChange}
              /><br />
              <button type='submit'
                id='clear'
                className='btn btn-dark'
                onClick={handleDeposit}
                disabled={!valid}
              > Deposit </button>
            </div>

          ) : (

            <div className="mb-3">
              <h5> Deposit Successful! </h5>
              <button type='submit'
                id='deposit-clear'
                className='btn btn-dark'
                onClick={clearForm}
              > Deposit More Money </button>
            </div>
            
          )}
        />
      </div>
    );
  } else {
    return (

      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          header="Deposit"
          title="Please log-in to continue."
          text={<a className='link' href='/#/login/'>Log-In</a>}
          body={<img alt='vault' className='rounded mx-auto d-block' src={photo} />}
        />
      </div>

    );
  };
};

export default Deposit;