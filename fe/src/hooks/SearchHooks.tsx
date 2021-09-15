import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { OrderListIF } from '../../types/pages/production/pages/production';
import { FetchList } from '../axios/axios_production';

// this hook gets the current data set and filters the results
// coming from the search box. filtered on a large string containing
// the data of the entire table by column.

export function useSearchInit(current_data_set: OrderListIF[]) {
  const [getSearchTerm, setSearchTerm] = useState<string>('');
  const [getSearchResults, setSearchResults] = useState<OrderListIF[]>([]);

  const SearchHandler = (current_search_term: string) => {
    setSearchTerm(current_search_term);
    if (current_search_term !== '') {
      const filteredList = current_data_set.filter((list: OrderListIF) => {
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
}

// this use effect, while seemingly missing dependencies,
// works correctly to flush the current search results
// array; refreshing the list to the newest state.
// only renders when the current data set has changed.
export function useFlushSearchArray(
  current_data_set: OrderListIF[],
  current_search_term: string,
  SearchHandler: (current_search_term: string) => void
) {
  useEffect(() => {
    SearchHandler('');
    SearchHandler(current_search_term);
    //eslint-disable-next-line
  }, [current_data_set]);
}

export async function refresh_list(
  api_path: string,
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>,
  path: string
) {
  await axios.put(api_path);

  await FetchList(path, setList);
}
