import React from 'react'
import ProductContainer from './ProductContainer';
import { Product } from '@/types';

interface MainPageProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

const MainPage: React.FC<MainPageProps> = ({ products }, { handleAddToCart }) => {
    return (
        <>
            <div className=''>

            </div>
            <div>
                <ProductContainer products={products} onAddToCart={handleAddToCart} />
            </div>
        </>
    )
}

export default MainPage;