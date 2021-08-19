import { useState, useEffect } from 'react';

// this hook gets the current data set and filters the results
// coming from the search box. filtered on a large string containing
// the data of the entire table by column.
export const useSearchInit = current_data_set => {
  const [getSearchTerm, setSearchTerm] = useState('');
  const [getSearchResults, setSearchResults] = useState([]);

  const SearchHandler = async current_search_term => {
    setSearchTerm(current_search_term);
    if (current_search_term !== '') {
      const filteredList = await current_data_set.filter(list => {
        return Object.values(list)
          .join(' ')
          .toLowerCase()
          .includes(current_search_term.toLowerCase());
      });
      setSearchResults(filteredList);
    } else {
      setSearchResults(current_data_set);
    }
  };

  return { getSearchTerm, getSearchResults, SearchHandler };
};

// this use effect, while seemingly missing dependencies,
// works correctly to flush the current search results
// array; refreshing the list to the newest state.
// only renders when the current data set has changed.
export const useSearchArrayFlush = (
  current_data_set,
  current_search_term,
  SearchHandler
) => {
  useEffect(() => {
    SearchHandler('');
    SearchHandler(current_search_term);
    //eslint-disable-next-line
  }, [current_data_set]);
};
