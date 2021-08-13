export default function Prod_Search({ getKeyword, setKeyword }) {
  return (
    <>
      <label htmlFor='searchbar' className='prod-search'>
        <input
          name='searchbar'
          type='search'
          className='prod-search__searchbar'
          placeholder='Search here...'
          // value={getKeyword}
          // onChange={e => setKeyword(e.target.value)}
        />
      </label>
    </>
  );
}
