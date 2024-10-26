import { Product } from '@/types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductContainer from './ProductContainer';

interface SearchResultProps {
    onAddToCart: (product: Product) => void;
}

const SearchResults: React.FC<SearchResultProps> = ({ onAddToCart }) => {
    const [results, setResults] = useState<Product[]>([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchResults = async () => {
            // if (!query) return;
            // try {
            //     const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            //     if (!response.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     const data: Product[] = await response.json();
            //     setResults(data);
            // } catch (error) {
            //     console.error('Error fetching search results:', error);
            // }
        };

        fetchResults();
    }, [query]);

    return (
        <div>
            <h1>Search Results for: {query}</h1>
            {results.length > 0 ? (
                <ProductContainer products={results} onAddToCart={onAddToCart} />
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
