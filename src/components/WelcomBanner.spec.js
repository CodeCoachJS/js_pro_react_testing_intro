import { screen, render } from '@testing-library/react';
import WelcomeBanner from './WelcomeBanner';

describe('WelcomeBanner', () => {
    // TODO: write a series of tests for the <WelcomeBannerComponent/>
    it('gives the correct greeting when a first name is present and NOT returning', () => {
        render(<WelcomeBanner firstName="John" isReturning={false} />);

        expect(screen.getByText('Welcome, John')).toBeInTheDocument();
    });
    it('gives the correct greeting when a first name is present and IS returning', () => {
        render(<WelcomeBanner firstName="John" isReturning={true} />);

        expect(screen.getByText('Welcome Back, John')).toBeInTheDocument();
    });
    it('gives the correct greeting when NO first name is present and NOT returning', () => {
        render(<WelcomeBanner firstName={null} isReturning={false} />);

        expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });
    it('gives the correct greeting when NO first name is present and IS returning', () => {
        render(<WelcomeBanner firstName={null} isReturning={true} />);

        expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    });

    // TODO: consolidate the tests above by using a truth table implementation
    it('gives the correct greeting', () => {
        const tests = [
            // firstName     isReturning        expected
            ['John', true, 'Welcome Back, John'],
            ['John', false, 'Welcome, John'],
            [null, true, 'Welcome Back!'],
            [null, false, 'Welcome!'],
        ];

        tests.forEach((test) => {
            const [firstName, isReturning, expected] = test;

            render(
                <WelcomeBanner
                    firstName={firstName}
                    isReturning={isReturning}
                />
            );

            expect(screen.getByText(expected)).toBeInTheDocument();
        });
    });
});
