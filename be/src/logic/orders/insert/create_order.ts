import volusion_fetch from '../../general/volusion_fetch';
import query_filter from './query_filter';
import dupliate_items from './duplicate_items';

export default async function create_order(id: number | string) {
  try {
    const data_array = await volusion_fetch(id);
    const data_filter = query_filter(data_array);

    if (Array.isArray(data_filter)) await dupliate_items(data_filter);
    else return console.log('Data not of type array');
  } catch (err) {
    return console.log(err);
  }
}
