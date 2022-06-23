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

describe.only('ProductList', () => {
    it('uses data from s3 for product images', async () => {
        aws.S3Client = function S3() {
            this.send = () => Promise.resolve('https://aws-image.com');
        };
        aws.GetObjectCommand = function GetObjectCommand() {};

        render(<ProductList />);

        expect(
            await screen.findByTestId('https://aws-image.com')
        ).toBeInTheDocument();
    });

    it('falls back to the original image if s3 fails', async () => {
        aws.S3Client = function S3() {
            this.send = () => Promise.reject(new Error('BOOM'));
        };
        aws.GetObjectCommand = function GetObjectCommand() {};

        render(<ProductList />);

        expect(
            await screen.findByTestId('https://www.image1.com')
        ).toBeInTheDocument();
    });
});
