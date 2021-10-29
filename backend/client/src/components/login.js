import React from 'react';
import Card from './card-context.js';
import firebase from '../fire.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Login() {
  const [logged, setLogged] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState(null);

  React.useEffect( ()=> {
    const auth= getAuth();
    onAuthStateChanged(auth, (user) =>{
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

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        header= {data ? `${data.name} > Log-Out` : "Log-In"}
        status={status}
        title={!logged && "Welcome back to the Bad Bank."}
        text={!logged && "Who are you again?"}
        body={logged ? 
          (<LogOutMessage 
            setLogged={setLogged}
            data={data}
          />) : 
          (<LoginForm 
            setStatus={setStatus}
            />
        )}
      />
    </div>
  )
};

function LogOutMessage(props) {

  function logOut() {
    const auth = firebase.getAuth();
    auth.signOut();
    props.setLogged(false);
  };

  return (
          <div className="mb-3 log-out">
            <h1 id='title'> Welcome back to the Bad Bank, {props.data ? props.data.name : '...'}! </h1>
            <h2 id='text'>Access your account with the Navigation above.</h2>
            <h3> Or log-out using the button below!</h3>
            <button type="submit"
              id='logout'
              className='btn btn-dark'
              onClick={logOut}
            > Log-Out </button><br /><br />
          </div>
  );
};

function LoginForm(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');

  function validate(field, label) {
    if (!field) {
      props.setStatus('Error: ' + label);
      setTimeout(() => props.setStatus(''), 3000);
      return false;
    } else {
      return true;
    };
  };

  function logIn() {
    if (!validate(email, 'Email')) return;
    if (!validate(password, 'Password')) return;

    const auth = firebase.getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      props.setStatus('User Not Found')
      setTimeout( ()=> props.setStatus(''), 3000);
    });
  };

return(
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

  );
};

export default Login;