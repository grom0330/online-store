import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'

function Filters() {
  const [search, setSearchParams] = useSearchParams()

  const [categories, brands, priceRange, stockRange, filter] = useProducts((s) => [
    s.categories,
    s.brands,
    s.priceRange,
    s.stockRange,
    s.filter
  ])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = qs.parse(search.toString(), { arrayFormat: 'comma' })

    if (typeof query[e.target.name] === 'string') {
      query[e.target.name] = [query[e.target.name] as string]
    }

    if (e.target.checked === true) {
      const arr = (query[e.target.name] as string[]) || []
      arr.push(e.target.value)
      query[e.target.name] = arr
    } else {
      const arr = (query[e.target.name] as string[]) || []
      const idx = arr.indexOf(e.target.value)
      arr.splice(idx, 1)
      query[e.target.name] = arr.length === 0 ? null : arr
    }

    const params = qs.stringify(query, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma'
    })

    filter(query)
    setSearchParams(params)
  }

  useEffect(() => {
    filter(qs.parse(search.toString()))
  }, [])

  return (
    <div className="px-3 py-2 rounded bg-gray-100">
      <h3 className="font-semibold">Category</h3>
      <div className="flex flex-col mb-4">
        {categories.map((category) => (
          <label key={category} className="flex flex-row items-center">
            <input type="checkbox" name="category" value={category} onChange={onChange} />
            &nbsp;<div className="first-letter:capitalize">{category}</div>
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Brands</h3>
      <div className="flex flex-col mb-4">
        {brands.map((brand) => (
          <label key={brand} className="flex flex-row items-center">
            <input type="checkbox" name="brand" value={brand} onChange={onChange} />
            &nbsp;{brand}
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Price</h3>
      <div className="relative h-10">
        <input
          className="w-full accent-purple-600"
          name="price"
          min={priceRange.min}
          max={priceRange.max}
          step={1}
          defaultValue={priceRange.min}
          type="range"
        />
        <input
          className="w-full accent-purple-600"
          name="price"
          min={priceRange.min}
          max={priceRange.max}
          step={1}
          type="range"
          defaultValue={priceRange.max}
        />
      </div>

      <h3 className="font-semibold">Stock</h3>
      <div className="relative h-10">
        <input
          className="w-full accent-purple-600"
          name="stock-min"
          min={stockRange.min}
          max={stockRange.max}
          step={1}
          type="range"
          defaultValue={stockRange.min}
        />
        <input
          className="w-full accent-purple-600"
          name="stock-max"
          min={stockRange.min}
          max={stockRange.max}
          step={1}
          type="range"
          defaultValue={stockRange.max}
        />
      </div>
    </div>
  )
}

export default Filters
