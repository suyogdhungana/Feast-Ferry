import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductContainerProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ products, onAddToCart }) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const handleToggleFavorite = (productId: string) => {
        setFavorites(prevFavorites =>
            prevFavorites.includes(productId) ? prevFavorites.filter(id => id !== productId) : [...prevFavorites, productId]
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={handleToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ProductContainer;
