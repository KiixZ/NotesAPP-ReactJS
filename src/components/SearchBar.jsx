import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ placeholder = "Cari catatan..." }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;