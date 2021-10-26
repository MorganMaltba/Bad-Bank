import Card from './card-context.js';
import photo from './images/vault.jpg'

function LoginMessage() {
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
  }

  export default LoginMessage;