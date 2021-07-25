import React from 'react';
import Card from './card-context.js';
import photo from './images/vault.jpg'

function Home () {

    return (
        <div>
           <Card 
                txtcolor = "black"
                bgcolor = "white"
                header = "Bad Bank Home Page"
                title = {'Welcome to the Bad Bank.'}
                text ={'Open an account today for $100 instant bonus!'}
                body = {<img className='rounded mx-auto d-block' alt='vault' src={photo}/>}
           />
        </div>
    );
};

export default Home;