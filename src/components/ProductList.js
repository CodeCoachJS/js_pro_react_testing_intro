import { useEffect, useState } from 'react';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import useApi from '../hooks/useApi';

const ProductList = () => {
    const client = new S3Client({ region: 'REGION' });

    const {
        data = [],
        isLoading,
        error,
    } = useApi({
        url: 'https://fakestoreapi.com/products',
    });

    const [apiData, setData] = useState(data);

    useEffect(() => {
        const getS3Data = async (data) => {
            for await (const datum of data) {
                try {
                    const image = await client.send(
                        new GetObjectCommand({
                            Bucket: datum.id,
                            Key: process.env.PRIVATE_KEY,
                        })
                    );
                    datum.image = image;
                } catch (e) {
                    continue;
                }
            }

            setData(data);
        };
        if (data?.length) {
            getS3Data(data);
        }
    }, [data]);

    const [total, setTotal] = useState(0);

    const addToCart = (item) => {
        setTotal((prev) => (prev += item.price));
    };

    if (error) {
        return <h2>Ruh Roh, there was an error: {error}</h2>;
    }

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (apiData?.length) {
        return (
            <div>
                <h2>Your Total: ${total.toFixed(2)}</h2>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {apiData.map((product) => (
                        <div
                            data-testid={product.title}
                            style={{ width: '25%', height: '300px' }}
                            key={product.id}
                        >
                            <img
                                data-testid={product.image}
                                width="50"
                                src={product.image}
                                alt={product.title}
                            />
                            <p>${product.price.toFixed(2)}</p>
                            <button
                                data-testid={`btn-${product.id}`}
                                onClick={() => addToCart(product)}
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </section>
            </div>
        );
    }
};

export default ProductList;
