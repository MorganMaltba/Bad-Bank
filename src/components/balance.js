import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context'
import photo from './images/vault.jpg'

function Balance() {

  const context = React.useContext(UserContext);
  const balance = '$ ' + JSON.stringify(context.users[0].balance);

  if (context.users[0].logged === true) {
    return (

      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          header="Balance"
          title={`Your Account Balance: ${balance}`}
          text={(
            <div>
              Need something else?
              <h4><a className='link' href='/#/withdraw/'>Withdraw</a></h4>
              <h4><a className='link' href='/#/deposit/'>Deposit</a></h4>
            </div>
          )}
          body={<img alt='vault' className='rounded mx-auto d-block' src={photo} />}
        />
      </div>

    )
  } else {

    return (
      
      <div>
        <Card
          txtcolor="black"
          bgcolor="white"
          header="Balance"
          title="Please log-in to continue."
          text={<a className='link' href='/#/login/'>Log-In</a>}
          body={<img alt='vault' className='rounded mx-auto d-block' src={photo} />}
        />
      </div>
      
    );
  };
};

export default Balance;