import App from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
    localStorage.setItem(
        'user',
        JSON.stringify({ firstName: 'John', logins: 2 })
    );
    it('grabs user information from local storage', () => {
        render(<App />);

        expect(screen.getByText('Welcome Back, John')).toBeInTheDocument();
    });
});
