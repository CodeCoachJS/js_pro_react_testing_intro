import { screen, render } from '@testing-library/react';
import ProductList from './ProductList';
import * as aws from '@aws-sdk/client-s3';

jest.mock('@aws-sdk/client-s3');

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
    it('uses data from s3 for product images', async () => {
        // TODO: write your test here
    });

    it('falls back to the original image if s3 fails', async () => {
        // TODO: write your test here
    });
});
