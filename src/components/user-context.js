import React from 'react';

export const UserContext = React.createContext({ users: [{
    name: 'Moeseph',
    email: 'example@email.com',
    password: 'secret',
    balance: 100,
    logged: false
}]
});
// Creates UserContext to be shared via the provider to components

export default UserContext;