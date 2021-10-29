import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from './card-context.js';
import photo from './images/vault.jpg'
import LoginMessage from './loginmessage.js'

function Balance() {
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
  }, []);

  if (logged === true) {
    return (
      <UserBalance data={data}/>
    )
  } else {
    return (
      <LoginMessage />
    )
  }
};

function UserBalance(props) {
  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header={props.data ? `${props.data.name} > Balance` : "Balance" }
        title={ props.data ? `Your Account Balance: $ ${props.data.balance}` : 'Loading...'}
        text={(
          <div>
            Need something else?
            <h4><a className='link' href='/withdraw/'>Withdraw</a></h4>
            <h4><a className='link' href='/deposit/'>Deposit</a></h4>
          </div>
        )}
        body={<img alt='vault' className='rounded mx-auto d-block' src={photo} />}
      />
    </div>
  );
};



export default Balance;