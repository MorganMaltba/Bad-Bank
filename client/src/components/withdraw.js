import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from './card-context.js';
import LoginMessage from './loginmessage.js'

function Withdraw() {
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
      <WithdrawForm data={data} />
    )
  } else {
    return (<LoginMessage/>)
  }
};

function WithdrawForm (props) {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [valid, setValid] = React.useState(false);
  const [withdraw, setWithdraw] = React.useState('');

  function handleChange(event) {
    if (isNaN(event.target.value)) {
      setValid(false);
      setWithdraw(withdraw)
      setStatus('Error: Enter valid amount.');
      setTimeout( ()=> setStatus(''), 3000);
      return
    }
    if (event.target.value < 0) {
      setValid(false);
      setStatus('Error: Enter valid amount.');
      setTimeout(() => setStatus(''), 3000)
      return;
    }; 
    if (event.target.value > props.data.balance) {
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
      const updateURL=`/account/update/${props.data.email}/${-withdraw}`
      async function hitUpdateAPI() {
        let res = await fetch(updateURL);
        let data = await res.json();
      }
      hitUpdateAPI();
      setShow(false);
    };
  };

  function clearForm() {
    setShow(true);
    setValid(false);
    setWithdraw('');
  };

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        status={status}
        header={props.data ? `${props.data.name} > Withdraw`: "Withdraw"}
        title={show && "Need cash now?"}
        text={show && "Don't forget to tip your server."}
        body={show ? (

          <div className="mb-3">
            <h3>Balance: ${props.data? props.data.balance : 'Loading...'}</h3>
            <input type="text"
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
          <WithdrawSuccess clearForm={clearForm}/>
        )}
      />
    </div>
  )
};

function WithdrawSuccess(props) {
  return (
    <div className="mb-3">
      <h5> Withdraw Successful! </h5>
      <button type='submit'
        id='withdraw-clear'
        className='btn btn-dark'
        onClick={props.clearForm}
      >Withdraw More Money</button>
    </div>
  )
}

export default Withdraw;