import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bars4Icon, Squares2X2Icon } from '@heroicons/react/24/outline'
import qs from 'query-string'

import useProducts from 'store/products'

export default function Controls() {
  const [search, setSearchParams] = useSearchParams()

  const [products, filter] = useProducts((s) => [s.products, s.filter])

  useEffect(() => {
    filter(qs.parse(search.toString(), { arrayFormat: 'comma' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let query = qs.parse(search.toString())
    query = { ...query, [e.target.name]: e.target.value }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })

    filter(query)
    setSearchParams(params)
  }

  return (
    <div className="flex flex-row items-center justify-between mb-2 p-1 rounded bg-gray-100">
      <select
        name="sort"
        defaultValue={search.get('sort') || ''}
        onChange={onChange}
        className="form-input rounded p-1 pr-10 h-8 w-auto"
      >
        <option value="">Sort options</option>
        <option value="price-asc">Price asc</option>
        <option value="price-desc">Price desc</option>
        <option value="rating-asc">Rating asc</option>
        <option value="rating-desc">Rating desc</option>
        <option value="discountPercentage-asc">Discount asc</option>
        <option value="discountPercentage-desc">Discount desc</option>
      </select>

      <div className="flex">
        Found: <span className="text-purple-500">{products.length}</span>
      </div>

      <input
        className="form-input rounded p-1 h-8"
        type="text"
        name="search"
        placeholder="Search"
        defaultValue={search.get('search') || ''}
        onChange={onChange}
      />

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
          <Bars4Icon
            width={24}
            height={24}
            stroke={search.get('sm') === 'true' ? 'purple' : 'black'}
            className="cursor-pointer"
          />
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
          <Squares2X2Icon
            width={24}
            height={24}
            stroke={search.get('sm') === 'false' ? 'purple' : 'black'}
            fill={search.get('sm') === 'false' ? 'purple' : 'white'}
            className="cursor-pointer"
          />
        </label>
      </div>
    </div>
  )
}
