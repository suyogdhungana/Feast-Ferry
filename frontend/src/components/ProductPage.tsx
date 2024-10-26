import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '@/types';

interface ProductPageProps {
    products: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ products }) => {
    const { productId } = useParams<{ productId: string }>();
    const product = products.find(p => p.id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
            <div className="md:w-1/2">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-64 md:h-full"
                />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                    <p className="mt-2 text-gray-600">{product.description}</p>
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                    </h2>
                </div>
                <button
                    // onClick={() => onAddToCart(product.id)}
                    className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
