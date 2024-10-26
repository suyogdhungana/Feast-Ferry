import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() === '') return;
        navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm('');
    };

    return (
        <div className="flex items-center">
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border w-96 rounded-none rounded-l-md"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button className='rounded-none rounded-r-md' onClick={handleSearch}>
                <IoSearch />
            </Button>
        </div>
    );
};

export default SearchBar;
