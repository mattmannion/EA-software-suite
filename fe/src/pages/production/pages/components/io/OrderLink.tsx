const admin_link =
  'https://www.everythingattachments.com/admin/AdminDetails_ProcessOrder.asp?table=Orders&Page=1&ID=';

export default function OrderLink({ order_id }: { order_id: string }) {
  return (
    <>
      <a
        href={admin_link + order_id}
        target='_blank'
        rel='noreferrer'
        className='btn btn-primary'
      >
        <strong>{order_id}</strong>
      </a>
    </>
  );
}
