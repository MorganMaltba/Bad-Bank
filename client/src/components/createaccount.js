import React from 'react';
import Card from './card-context.js';
import photo from './images/vault.jpg'
import firebase from '../fire.js'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, deleteUser } from "firebase/auth";

function CreateAccount() {
  const [logged, setLogged] = React.useState(false);
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

  if (logged === false) {
    return (<CreateUser/>)
  } else {
    return (<LogOutMessage
      data={data}/>)
  };
};

function LogOutMessage(props) {
  const [status, setStatus] = React.useState('');

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        status={status}
        header={props.data ? `${props.data.name} > Create Account`: "Create Account"}
        title="Thank you for joining us!"
        text={<h3> Please <a className='link' href='/#/login/'>Log-Out</a> to create another account.</h3>}
        body={<DeleteUserForm setStatus={setStatus}/>}
      />
    </div>
  );
};

function DeleteUserForm (props){
  const [email, setEmail] = React.useState('');
 
  function handleDelete() {
    const auth = firebase.getAuth();
    const user = auth.currentUser;

    if (email === user.email){

    deleteUser(user)
      .then( () => alert('User Deleted'))
      .catch( (err) => console.log(err))
      
    const deleteURL = `/account/delete/${email}`
    async function hitDeleteAPI() {
      let res = await fetch(deleteURL);
      let data = await res.json();
    };
    hitDeleteAPI();

  } else {
    props.setStatus('Invalid Email.')
    setTimeout(()=> props.setStatus(''), 3000);
  }

  }
  return(
    <div id='deleteform'>
      <img alt='vault' className='rounded mx-auto d-block' src={photo} />
      <h5> Do you really want to leave us?</h5>
      <h6> Enter your email below to delete your Bad Bank Account.</h6>
      <input type="email"
        id='deleteemail'
        className="form-control"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value)
        }} />
      <button type="submit"
        id='delete'
        className='btn btn-dark'
        onClick={handleDelete}
      > Delete Account </button>
    </div>
  )
}
function CreateUser(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  function validate(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => props.setStatus(''), 3000);
      return false;
    } else {
      return true;
    };
  };

  function validatePassword(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 3000);
      return false;
    };
    if (field.length < 8) {
      setStatus('Error: ' + label + ' must be 8 characters');
      setTimeout(() => setStatus(''), 3000);
      return false;
    } else {
      return true;
    }
  };

  function handleCreate() {
 
    if (!validate(name, 'Name')) return;
    if (!validate(email, 'Email')) return;
    if (!validatePassword(password, 'Password')) return;

    const auth = firebase.getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then( () => {
          const createURL = `/account/create/${name}/${email}/${password}`;
          async function hitcreateAPI() {
            let res = await fetch(createURL);
            let data = await res.json();
      
          };
          hitcreateAPI();
          setSuccess(true);
        })
        .catch(  (err) => {
          console.log(err);
          setStatus('Email already in use!')
          setTimeout(() => setStatus(''), 3000)
        });
  };

  return (
    <div>
      <Card
        txtcolor="black"
        bgcolor="white"
        status={status}
        header="Create Account"
        title="Open a Bad Bank account today!"
        text="Need help? Call us at (248)434-5508 anytime!"
        body={success ?
          (<SuccessMessage/>) :
          (<CreateUserForm 
            handleCreate={handleCreate} 
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setStatus={setStatus}
            />)
        }
      />
    </div>
  )
}

function SuccessMessage(props) {
  return (
    <div className="mb-3">
      <h3> Account Creation Successful! </h3>
      <h5> Logging in...</h5>
    </div>
  );
};

function CreateUserForm(props) {
  const [disable, setDisable] = React.useState(true);

  return (
    <div className="mb-3">

      <label className="form-label"> Name </label>
      <input type="name"
        id='name'
        className="form-control"
        placeholder="Enter Name"
        value={props.name}
        onChange={(e) => {
          props.setName(e.currentTarget.value);
          setDisable(false);
        }}
      /><br />

      <label className="form-label"> Email </label>
      <input type="email"
        id='email'
        className="form-control"
        placeholder="Enter Email"
        value={props.email}
        onChange={(e) => {
          props.setEmail(e.currentTarget.value)
          setDisable(false);
        }}
      /><br />

      <label className="form-label"> Password </label>
      <input type="password"
        id='password'
        className="form-control"
        placeholder="Enter Password"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.currentTarget.value)
          setDisable(false);
        }}
      /><br />

      <button type="submit"
        id='create'
        className='btn btn-dark'
        onClick={props.handleCreate}
        disabled={disable}
      > Create Account </button>

    </div>
  )
}

export default CreateAccount;