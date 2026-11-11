import { useState } from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm) {
      onSearch(trimmedTerm);
    }
  }

  function handleClear() {
    setSearchTerm('');
    onClear();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Search size={20} className="search-icon" />

      <input
        type="search"
        placeholder="Search for a species..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        aria-label="Search for a species"
      />

      {searchTerm && (
        <button
          type="button"
          className="clear-search"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
