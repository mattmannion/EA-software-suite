import Modal from 'react-modal';
import { modalStyles } from '../../../../../util/modal_util';
import { useModalHook } from '../../../../../hooks/ModalHooks';
import { btn_pd } from '../../../../../util/util';
import { PLModalData } from './PLModalData';
import { OrderListIF } from '../../../../../../types/pages/production/pages/production';
import { useContext } from 'react';
import { ListCtx } from '../../../../../context/ProdContext';
import ItemCounter from '../io/ItemCounter';

interface PLModalCtx {
  getList: OrderListIF[];
  SearchHandler: (current_search_term: string) => void;
}

Modal.setAppElement('#root');

export default function PLModal() {
  const { getList, SearchHandler }: PLModalCtx = useContext(ListCtx);

  const slug = '/production';
  const { getIsModalOpen, openModal, closeModal } = useModalHook(slug);

  const size = Math.ceil(Object.entries(PLModalData).length / 4);

  const ta = Object.entries(PLModalData).slice(0, size);
  const tb = Object.entries(PLModalData).slice(size, size * 2);
  const tc = Object.entries(PLModalData).slice(size * 2, size * 3);
  const td = Object.entries(PLModalData).slice(size * 3, size * 4);

  const Table = ({ table_body }: any) => {
    const item_count = (value: any) =>
      getList
        .map(({ product_code }: { product_code: string }) => product_code)
        .filter((f: string) => f.includes(value)).length;
    return (
      <>
        <table className='table table-hover table-sm'>
          <thead>
            <tr>
              <th>Product Type</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {table_body.map(
              ([key, value]: [key: string, value: string], i: number) => {
                return (
                  <tr key={i}>
                    <th>
                      <button
                        className='btn'
                        onClick={() => SearchHandler(value)}
                        onMouseDown={btn_pd}
                      >
                        {key}
                      </button>
                    </th>
                    <td>
                      <strong>{item_count(value)}</strong>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <button
        className='btn btn-success'
        onClick={openModal}
        onMouseDown={btn_pd}
      >
        &#9776;
      </button>
      <Modal
        isOpen={getIsModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='d-flex justify-content-center'>
          <h2 className='text-center mx-5'>Product List</h2>
          <button className='btn btn-danger' onClick={closeModal}>
            &#x2715;
          </button>
        </div>
        <div className='d-flex'>
          <Table table_body={ta} />
          <Table table_body={tb} />
          <Table table_body={tc} />
          <Table table_body={td} />
        </div>
      </Modal>
      <ItemCounter />
    </div>
  );
}
