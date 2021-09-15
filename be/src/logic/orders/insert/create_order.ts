import volusion_fetch from '../../general/volusion_fetch';
import query_filter from './query_filter';
import dupliate_items from './duplicate_items';

export default async function create_order(order_id: number | string) {
  try {
    const data_array = await volusion_fetch(order_id);
    const data_filter = await query_filter(data_array);

    if (Array.isArray(data_filter)) await dupliate_items(data_filter);
    else return;
  } catch (err) {
    return console.log(err);
  }
}
