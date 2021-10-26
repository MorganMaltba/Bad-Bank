import React from 'react';
import Card from './card-context.js';

function AllData() {
  const [data, setData] = React.useState(null);

  React.useEffect( () => {
  const dataURL = `/account/all`;

  async function hitAPI() {
    let res = await fetch(dataURL);
    let data = await res.json();
    return data;
  };

  hitAPI()
    .then( (data) => {
      setData([...data]);
  });
  }, []);

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header='All Data'
        title="All Data Shown Here"
        text="Here at Bad Bank, we believe in transparency."
        body={ data ?
          <table className="table table-striped">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((user, i) =>
                  <tr key={i}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.balance}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        :
        <h3> Loading... </h3>
        }
      />

    </div>
  );
};

export default AllData;