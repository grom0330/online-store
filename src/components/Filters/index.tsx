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

  useEffect(() => {
    filter(qs.parse(search.toString(), { arrayFormat: 'comma', parseNumbers: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const onRangeChange = (p: { name: string; min: number; max: number }) => {
    const query = qs.parse(search.toString(), { arrayFormat: 'comma', parseNumbers: true })
    query[p.name] = [p.min, p.max]
    const params = qs.stringify(query, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma'
    })
    filter(query)
    setSearchParams(params)
  }

  return (
    <>
      <h3 className="font-semibold">Category</h3>
      <div className="flex flex-col mb-4 overflow-y-scroll max-h-54 px-1">
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
      <div className="flex flex-col mb-4 overflow-y-scroll max-h-52 px-1">
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
      <DualRange
        name="price"
        defaultMin={Number(search.get('price')?.split(',')[0])}
        defaultMax={Number(search.get('price')?.split(',')[1])}
        min={priceRange.min}
        max={priceRange.max}
        onChange={onRangeChange}
      />

      <h3 className="font-semibold">Stock</h3>
      <DualRange
        name="stock"
        defaultMin={Number(search.get('stock')?.split(',')[0])}
        defaultMax={Number(search.get('stock')?.split(',')[1])}
        min={stockRange.min}
        max={stockRange.max}
        onChange={onRangeChange}
      />
    </>
  )
}

export default Filters
