import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'
import DualRange from 'components/DualRange'

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

  const onRangeChange = (p: { min: number; max: number }) => {
    const query = qs.parse(search.toString(), { arrayFormat: 'comma' })
  }

  useEffect(() => {
    filter(qs.parse(search.toString()))
  }, [])

  return (
    <>
      <h3 className="font-semibold">Category</h3>
      <div className="flex flex-col mb-4">
        {categories.map((category) => (
          <label key={category} className="flex flex-row items-center">
            <input
              type="checkbox"
              name="category"
              value={category}
              defaultChecked={search.get('category')?.includes(category)}
              onChange={onChange}
            />
            &nbsp;<div className="first-letter:capitalize">{category}</div>
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Brands</h3>
      <div className="flex flex-col mb-4">
        {brands.map((brand) => (
          <label key={brand} className="flex flex-row items-center">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={onChange}
              defaultChecked={search.get('brand')?.includes(brand)}
            />
            &nbsp;<div className="first-letter:capitalize">{brand}</div>
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Price</h3>
      <DualRange min={priceRange.min} max={priceRange.max} onChange={onRangeChange} />

      <h3 className="font-semibold">Stock</h3>
      <DualRange min={stockRange.min} max={stockRange.max} onChange={onRangeChange} />
    </>
  )
}

export default Filters
