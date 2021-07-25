import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';
import Login from './components/login.js'

test('Verifies NavBar', () => {
  const {getByText} = render(<App />);

  expect(getByText('Bad Bank')).not.toBeNull;
  expect(getByText('Create Account')).not.toBeNull;
  expect(getByText('Log-In')).not.toBeNull;
  expect(getByText('Balance')).not.toBeNull;
  expect(getByText('Withdraw')).not.toBeNull;
  expect(getByText('Deposit')).not.toBeNull;
  expect(getByText('All Data')).not.toBeNull;

  expect(getByText('Bad Bank Home Page')).not.toBeNull;
  expect(getByText('Use navigation above to explore')).not.toBeNull;
  expect(getByText('Welcome to the Bad Bank Moeseph!')).not.toBeNull;

});

test ('Verifies Log-In Page', async () =>  {
  const {getByText, getByPlaceholderText} = render(<App/>)

  const loginLink = getByText('Log-In');
  
  fireEvent.click(loginLink);

  expect(getByText('Welcome back to the Bad Bank')).not.toBeNull;

});

