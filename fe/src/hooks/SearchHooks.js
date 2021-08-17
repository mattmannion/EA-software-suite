import { useState } from 'react';

export const useSearchInit = current_data_set => {
  const [getSearchTerm, setSearchTerm] = useState('');
  const [getSearchResults, setSearchResults] = useState([]);

  const SearchHandler = current_search_term => {
    setSearchTerm(current_search_term);
    if (current_search_term !== '') {
      const filteredList = current_data_set.filter(list => {
        return Object.values(list)
          .join(' ')
          .toLowerCase()
          .includes(current_search_term.toLowerCase());
      });
      setSearchResults(filteredList);
    } else setSearchResults(current_data_set);
  };

  return { getSearchTerm, getSearchResults, SearchHandler };
};
