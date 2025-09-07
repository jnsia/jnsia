import { useState } from 'react';

export default function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const changeSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    changeSearchQuery,
    clearSearchQuery,
  };
}
