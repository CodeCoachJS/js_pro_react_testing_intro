import { useState } from 'react';
import useApi from '../hooks/useApi';

const ProductList = () => {
    const {
        data = [],
        isLoading,
        error,
    } = useApi({
        url: 'https://fakestoreapi.com/products',
    });

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

    if (data?.length) {
        return (
            <div>
                <h2>Your Total: ${total.toFixed(2)}</h2>
                <section style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data.map((product) => (
                        <div
                            data-testid={product.title}
                            style={{ width: '25%', height: '300px' }}
                            key={product.id}
                        >
                            <img
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
