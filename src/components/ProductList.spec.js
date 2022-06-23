import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductList from './ProductList';

global.fetch = async () =>
    Promise.resolve({
        json: async () =>
            Promise.resolve([
                {
                    title: 'title',
                    id: 'id',
                    image: 'https://www.image1.com',
                    price: 123,
                },
            ]),
    });

describe('ProductList', () => {
    it('shows a loader and some products', async () => {
        render(<ProductList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(await screen.findByText('$123.00')).toBeInTheDocument();
    });

    it('adds to the total when a user adds to cart', async () => {
        render(<ProductList />);
        // TODO: add your tests here
    });
});
