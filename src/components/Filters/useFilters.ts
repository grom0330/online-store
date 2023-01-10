import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'

export default function useFilters() {
  const [search, setSearchParams] = useSearchParams()

  const query = qs.parse(search.toString(), { arrayFormat: 'comma', parseNumbers: true })

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

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    query[p.name] = [p.min, p.max]

    const params = qs.stringify(query, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma'
    })

    filter(query)
    setSearchParams(params)
  }

  const isChecked = (fieldName: 'category' | 'brand', value?: string) => {
    if (!value) return
    return (query[fieldName] as string[]).includes(value)
  }

  const getDefaultRangeValue = (fieldName: 'price' | 'stock', minMax: 'min' | 'max') => {
    const field = query[fieldName] as number[]
    if (minMax === 'min') return field[0]
    if (minMax === 'max') return field[1]
  }

  return {
    categories,
    brands,
    search,
    query,
    priceRange,
    stockRange,
    onFilterChange,
    onRangeChange,
    isChecked,
    getDefaultRangeValue
  }
}
