import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'
import useProducts from 'store/products'

export default function Controls() {
  const [search, setSearchParams] = useSearchParams()

  const filter = useProducts((s) => s.filter)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const query = qs.parse(search.toString())
    let newQuery = { ...query, [e.target.name]: e.target.value }
    newQuery = Object.fromEntries(Object.entries(newQuery).filter(([, v]) => v !== ''))
    const params = qs.stringify(newQuery)
    setSearchParams(params)
    filter(newQuery)
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex">
        <p>Sort</p>
        <select name="sort" defaultValue={search.get('sort') || ''} onChange={onChange}>
          <option />
          <option value="price-asc">price asc</option>
          <option value="price-desc">price desc</option>
          <option value="rating-asc">rating asc</option>
          <option value="rating-desc">rating desc</option>
          <option value="discount-asc">discount asc</option>
          <option value="discount-desc">discount desc</option>
        </select>
      </div>

      <div className="flex">
        <label className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            name="search"
            defaultValue={search.get('search') || ''}
            onChange={onChange}
          />
        </label>
      </div>

      <div className="flex">
        <label>
          <input
            type="radio"
            name="sm"
            defaultChecked={search.get('sm') === 'true'}
            value="true"
            onChange={onChange}
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="purple"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </label>

        <label>
          <input
            type="radio"
            name="sm"
            defaultChecked={search.get('sm') === 'false'}
            value="false"
            onChange={onChange}
            className="hidden"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="purple"
            className="w-6 h-6 cursor-pointer hover:fill-purple-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </label>
      </div>
    </div>
  )
}
