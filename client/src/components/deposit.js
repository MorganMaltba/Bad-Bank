import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from './card-context.js';
import LoginMessage from './loginmessage.js'

function Deposit() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchURL = `/account/${user.email}`
        async function hitAPI() {
          let res = await fetch(fetchURL)
          let data = await res.json();
          return data
        };
        hitAPI()
          .then((data) => {
            setData(data)
          });
        setLogged(true);
      } else {
        setLogged(false);
      };
    })
  }, [data]);

  if (logged === true) {
    return (
      <UserDeposit data={data} />
    )
  } else {
    return (<LoginMessage />)
  }
};

function UserDeposit(props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [deposit, setDeposit] = React.useState('');

  function handleChange(event) {
    if (isNaN(event.target.value)) {
      setValid(false);
      setDeposit(deposit)
      setStatus('Error: Enter valid amount.');
      setTimeout( ()=> setStatus(''), 3000);
      return
    }
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
      const updateURL = `/account/update/${props.data.email}/${deposit}`
      async function hitUpdateAPI() {
        let res = await fetch(updateURL);
        let data = await res.json();
      }
      hitUpdateAPI();
      setShow(false);
    }
  };

  function clearForm() {
    setShow(true);
    setValid(false);
    setDeposit('');
  };

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        status={status}
        header={props.data ? `${props.data.name} > Deposit` : 'Deposit'}
        title={show && "Stash your cash here!"}
        text={show && "Maintenance fees waived with qualifying deposits."}
        body={show ? (
          <div className="mb-3">
            <h3>Balance: ${props.data ? props.data.balance : 'Loading...'}</h3>
            <input type="text"
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
          <DepositSuccess clearForm={clearForm} />
        )}
      />
    </div>
  );
};

function DepositSuccess(props) {
  return (
    <div className="mb-3">
      <h5> Deposit Successful! </h5>
      <button type='submit'
        id='deposit-clear'
        className='btn btn-dark'
        onClick={props.clearForm}
      > Deposit More Money </button>
    </div>
  );
};

export default Deposit;