import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context'

function AllData() {
  const context = React.useContext(UserContext);

  return (

    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header="All Data"
        title="All Data Shown Here"
        text="Here at Bad Bank, we believe in transparency."
        body={

          <table className="table table-striped">

            <thead>
              <tr className='table-dark'>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
                <th scope="col">Logged-In?</th>
              </tr>
            </thead>

            <tbody>

              {
                context.users.map((user, i) =>
                  <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                    <td>{`${user.logged}`}</td>
                  </tr>
                )
              }

            </tbody>
          </table>
        }
      />
    </div>
  );
};

export default AllData;