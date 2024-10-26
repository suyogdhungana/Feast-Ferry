import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Product } from '../types';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onToggleFavorite: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite(product.id);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <Link to={`/product/${product.id}`}>
                <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
                <div className="px-6 py-4">
                    <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-base mb-2">{product.description}</p>
                    <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                </div>
            </Link>
            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <button
                    onClick={handleFavoriteToggle}
                    className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                >
                    {isFavorite ? <MdFavorite /> :
                        <MdFavoriteBorder />
                    }
                </button>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
                    className=" text-white font-bold py-2 px-4 rounded"
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
