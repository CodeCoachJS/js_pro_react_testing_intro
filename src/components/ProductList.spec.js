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
        const awsImgUrl = 'https://awsimage.com';
        aws.S3Client = function () {
            return {
                send: async () => Promise.resolve(awsImgUrl),
            };
        };

        aws.GetObjectCommand = function () {
            return;
        };

        render(<ProductList />);
        expect(await screen.findByTestId(awsImgUrl)).toBeInTheDocument();
    });

    it('falls back to the original image if s3 fails', async () => {
        aws.S3Client = function () {
            return {
                send: async () => Promise.reject('BOOM'),
            };
        };

        aws.GetObjectCommand = function () {
            return;
        };

        render(<ProductList />);
        expect(
            await screen.findByTestId('https://www.image1.com')
        ).toBeInTheDocument();
    });
});
