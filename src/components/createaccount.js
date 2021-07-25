import React from 'react';
import Card from './card-context.js';
import UserContext from './user-context'
import photo from './images/vault.jpg'

function CreateAccount() {
  const context = React.useContext(UserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disable, setDisable] = React.useState(true);



  function handleCreate() {
    console.log(name,email,password)
    if(!validate(name, 'Name')) return;
    if(!validate(email, 'Email')) return;
    if(!validatePassword(password, 'Password')) return;
    context.users.push({name,email,password,balance:100,logged:false});
    setShow(false);
  };

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  };

  function validate (field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout ( () => setStatus(''), 3000);
      return false;
    } else {
      return true;
    };
  };

  function validatePassword (field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout ( ()=> setStatus(''), 3000);
      return false;
    };
    if (field.length < 8) {
      setStatus('Error: ' + label + ' must be 8 characters');
      setTimeout( () => setStatus(''), 3000);
      return false;
    } else {
      return true;
    }
  };

if (context.users[0].logged === false) {
  return (
    <div>
      <Card 
        txtcolor = "black"
        bgcolor = "white"
        status = {status}
        header = "Create Account"
        title = { show && "Open a Bad Bank account today!"}
        text = { show && "Need help? Call us at (248)434-5508 anytime!" }

        body = {show ? (
          <div className="mb-3">
            <label className="form-label"> Name </label>
              <input type="name" 
                id='name' 
                className="form-control" 
                placeholder="Enter Name"
                value={name}
                onChange={ (e) => {
                  setName(e.currentTarget.value);
                  setDisable(false);
                }}
              /><br/>
            <label className="form-label"> Email </label>
              <input type="email" 
                id='email' 
                className="form-control" 
                placeholder="Enter Email"
                value={email}
                onChange={ (e) => {
                  setEmail(e.currentTarget.value)
                  setDisable(false);
                }}
              /><br/>
            <label className="form-label"> Password </label>
              <input type="password" 
                id='password' 
                className="form-control" 
                placeholder="Enter Password"
                value={password}
                onChange={ (e) => {
                  setPassword(e.currentTarget.value)
                  setDisable(false);
                }}
              /><br/>
            <button type ="submit"
              id='create'
              className='btn btn-dark'
              onClick={handleCreate}
              disabled={disable}
            > Create Account </button>
          </div>
        ) : (
          <div className="mb-3">
            <h5> Success! </h5>
            <button type='submit'
              id='create-clear'
              className='btn btn-dark'
              onClick={clearForm}
            > Add Another Account </button>
          </div>
        )}
      />
    </div>
  )
        } else {
          return(
         
            <div>
            <Card 
                    txtcolor = "black"
                    bgcolor = "white"
                    header = "Create Account"
                    title = "Please log-out to continue."
                    text = {<a className='link' href='/#/login/'>Log-Out</a>}
                    body = {<img alt='vault' className='rounded mx-auto d-block' src={photo}/>}
            />
            </div>

          )
        };
};

export default CreateAccount;