import React from 'react';
import Card from './card-context.js';
import photo from './images/vault.jpg'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
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

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header={data ? `${data.name} > Home Page` : "Bad Bank Home Page"}
        title={data ? `We value your business, ${data.name}.` : 'Welcome to the Bad Bank.'}
        text={data ? `That's why we're here for you.` : 'Open an account today for $100 instant bonus!'}
        body={
          <div id = 'home'>
          <h3> Reach us by phone:</h3>
            <h5>(248)434-5508</h5>
          <h3> Reach us by mail:</h3>
              <h5>P.O. Box 1234,<br/>
              Flavortown ST, 56789</h5>
          <h3> Email us:</h3>
            <h5>info@badbank.com</h5>
          <img className='rounded mx-auto d-block' alt='vault' src={photo} />
        </div>
        }
      />
    </div>
  );
};

export default Home; 