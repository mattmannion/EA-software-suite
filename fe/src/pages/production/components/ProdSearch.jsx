export default function Prod_Search() {
  return (
    <>
      <label htmlFor='searchbar' className='prod-search'>
        <input
          name='searchbar'
          type='search'
          className='prod-search__searchbar'
          placeholder='Search here...'
        />
      </label>
    </>
  );
}
