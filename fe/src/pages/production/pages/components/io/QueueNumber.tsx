import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';

interface QueueNumberIF {
  i: number;
}

export default function QueueNumber({ i }: QueueNumberIF) {
  const { getCurrentPage, getItemsPP } = useContext(ListCtx);
  return <>{i + 1 + getCurrentPage * getItemsPP - getItemsPP}</>;
}
