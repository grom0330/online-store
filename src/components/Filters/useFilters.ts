import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'

export default function useFilters() {
  const [search, setSearchParams] = useSearchParams()

  const products = useProducts()

  useEffect(() => {
    products.filter(qs.parse(search.toString(), { arrayFormat: 'comma', parseNumbers: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    products.filter(query)
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

    products.filter(query)
    setSearchParams(params)
  }

  const onReset = () => {
    setSearchParams({}, { replace: true })
    products.filter({})
  }

  const [isSearchParamsCopied, setSearchParamsCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setSearchParamsCopied(() => true)
      setTimeout(() => {
        setSearchParamsCopied(false)
      }, 3000)
    } catch (e) {
      console.error(e)
    }
  }

  const isChecked = (fieldName: 'category' | 'brand', value?: string) => {
    if (!value) return false

    const query = qs.parse(search.toString(), { arrayFormat: 'comma' })
    let categoryArr = query[fieldName] as string[]

    if (typeof categoryArr === 'string') {
      categoryArr = [categoryArr] as string[]
    }

    const result = categoryArr?.includes(value) || false

    return result
  }

  const getDefaultRangeValue = (fieldName: 'price' | 'stock', minMax: 'min' | 'max') => {
    const query = qs.parse(search.toString(), { arrayFormat: 'comma', parseNumbers: true })
    const field = query[fieldName] as number[]

    if (!field) return
    if (minMax === 'min') return field[0]
    if (minMax === 'max') return field[1]
  }

  return {
    search,
    ...products,
    isSearchParamsCopied,
    onFilterChange,
    onRangeChange,
    onReset,
    isChecked,
    getDefaultRangeValue,
    onCopy
  }
}
