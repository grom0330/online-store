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
        <p>Search</p>
        <input
          type="text"
          name="search"
          defaultValue={search.get('search') || ''}
          onChange={onChange}
        />
      </div>

      <div className="flex">
        <input
          type="radio"
          name="sm"
          defaultChecked={search.get('sm') === 'true'}
          value="true"
          onChange={onChange}
        />
        <input
          type="radio"
          name="sm"
          defaultChecked={search.get('sm') === 'false'}
          value="false"
          onChange={onChange}
        />
      </div>
    </div>
  )
}
