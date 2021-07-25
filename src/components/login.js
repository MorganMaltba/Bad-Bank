import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context'


function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [logged, setLogged] = React.useState(false);

  let context = React.useContext(UserContext);

  React.useEffect(() => {
    if (context.users[0].logged === true) {
      setLogged(true);
    }
  }, [context.users])

  function logIn() {

    if (!validate(email, 'Email')) return;
    if (!validate(password, 'Password')) return;

    for (let i = 0; i < context.users.length; i++) {

      if (email === context.users[i].email) {
        if (password === context.users[i].password) {

          let user = context.users[i];
          user.logged = true;
          let temp = context.users.filter(item => item !== user);
          temp = [user, ...temp];
          context.users = temp;

          console.log(temp);
          setLogged(true);;
          console.log(`success! user: ${user.name} is logged in`);
          return;
        } else {
          setStatus('Password Incorrect')
          setTimeout(() => setStatus(''), 3000);
          return;
        };
      };
    };
  };

  function logOut() {
    context.users[0].logged = false;
    console.log('Log Out')
    setLogged(false);
    setStatus('');
  };

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    } else {
      return true;
    };
  };

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header="Log-In"
        status={status}
        title={!logged && "Welcome back to the Bad Bank."}
        text={!logged && "Who are you again?"}
        body={logged ? (
          
          <div className="mb-3 log-out">
            <h1 id='title'> Welcome, {context.users[0].name}! </h1>
            <h2 id='text'>Access your account with the Navigation above.</h2>
            <button type="submit"
              id='logout'
              className='btn btn-dark'
              onClick={logOut}
            > Log-Out </button><br /><br />
          </div>

        ) : (

          <div className="mb-3">
            <label className="form-label"> Email </label>
            <input type="email"
              id='email'
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            /><br />
            <label className="form-label"> Password </label>
            <input type="password"
              id='password'
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            /><br />
            <button type="submit"
              id='login'
              className='btn btn-dark'
              onClick={logIn}
            > Log-In </button>
          </div>

        )}
      />
    </div>
  );
};

export default Login;
