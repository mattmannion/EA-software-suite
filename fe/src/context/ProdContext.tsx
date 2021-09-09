import { createContext } from 'react';
import { OrderListIF } from '../../types/pages/production/pages/production';

// just for documentation
// this is what is stored
interface ListCtxIF {
  getList: OrderListIF[];
  setList: React.Dispatch<React.SetStateAction<OrderListIF[]>>;
  getSearchTerm: string;
  getSearchResults: OrderListIF[];
  SearchHandler: (current_search_term: string) => void;
  currentItems: OrderListIF[];
  pageNumber: number;
  renderPageNumbers: JSX.Element[];
  FirstPage: () => void;
  PrevPage: () => void;
  NextPage: () => void;
  LastPage: () => void;
}

export const ListCtx = createContext<ListCtxIF>({} as ListCtxIF);

interface ListCtxProviderIF {
  children: React.ReactNode;
  value: ListCtxIF;
}

export default function ListCtxProvider({
  children,
  value,
}: ListCtxProviderIF) {
  return <ListCtx.Provider value={value}>{children}</ListCtx.Provider>;
}
