import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context'
import photo from './images/vault.jpg'

function Withdraw() {
  const context = React.useContext(UserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState(context.users[0].balance);
  const [valid, setValid] = React.useState(false);
  const [withdraw, setWithdraw] = React.useState('');

  function handleChange(event) {
    if (event.target.value < 0) {
      setValid(false);
      setStatus('Error: Enter valid amount.');
      setTimeout(() => setStatus(''), 3000)
      return;
    };
    if (event.target.value > balance) {
      setValid(false);
      setStatus('Error: Withdraw amount cannot exceed account balance.')
      setTimeout(() => setStatus(''), 3000);
      return;
    } else {
      setValid(true);
      setWithdraw(Number(event.target.value));
    };
  };

  function handleWithdraw(event) {
    if (withdraw > 0) {
      let newTotal = balance - withdraw;
      context.users[0].balance = newTotal;
      setBalance(newTotal);
      setShow(false);
    }
  };

  function clearForm() {
    setShow(true);
    setValid(false);
    setWithdraw('');
  };

  if (context.users[0].logged === true) {
    return (
      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          status={status}
          header="Withdraw"
          title={show && "Need cash now?"}
          text={show && "Don't forget to tip your server."}
          body={show ? (

            <div className="mb-3">
              <h3>Balance: ${balance}</h3>
              <input type="number"
                id='withdraw'
                className="form-control"
                placeholder="Enter Amount"
                value={withdraw}
                onChange={handleChange}
              /><br />
              <button type='submit'
                id='clear'
                className='btn btn-dark'
                onClick={handleWithdraw}
                disabled={!valid}
              > Withdraw </button>
            </div>

          ) : (

            <div className="mb-3">
              <h5> Withdraw Successful! </h5>
              <button type='submit'
                id='withdraw-clear'
                className='btn btn-dark'
                onClick={clearForm}
              >Withdraw More Money</button>
            </div>

          )}
        />
      </div>
    )

  } else {
    
    return (
      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          header="Withdraw"
          title="Please log-in to continue."
          text={<a className='link' href='/#/login/'>Log-In</a>}
          body={<img alt='vault' className='rounded mx-auto d-block' src={photo} />}
        />
      </div>
    );
  }
};

export default Withdraw;