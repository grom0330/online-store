import { Product } from 'dummyjson-api/models'

export function search(products: Product[], searchString: string) {
  return products.filter((p) => {
    const search = searchString.toLowerCase()

    return (
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.price.toString().includes(search) ||
      p.stock.toString().includes(search) ||
      p.rating.toString().includes(search) ||
      p.discountPercentage.toString().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    )
  })
}

export function filterByCategory(products: Product[], categories: string[]) {
  return products.filter((p) => {
    return categories.includes(p.category.toLowerCase())
  })
}

export function filterByBrand(products: Product[], brands: string[]) {
  return products.filter((p) => {
    return brands.includes(p.brand.toLowerCase())
  })
}

export function sort(products: Product[], sortString: string) {
  const [field, direction] = sortString.split('-')

  return [...products].sort((a, b) => {
    const aValue = a[field as keyof Product] as number
    const bValue = b[field as keyof Product] as number

    if (direction === 'asc') {
      return aValue - bValue
    }

    if (direction === 'desc') {
      return bValue - aValue
    }

    return 0
  })
}

export function getProductsMeta(products: Product[]) {
  return products.reduce(
    (acc, curr) => {
      if (!acc.categories.includes(curr.category.toLowerCase())) {
        acc.categories.push(curr.category.toLowerCase())
      }

      if (!acc.brands.includes(curr.brand.toLowerCase())) {
        acc.brands.push(curr.brand.toLowerCase())
      }

      if (curr.price < acc.priceRange.min) {
        acc.priceRange.min = curr.price
      }

      if (curr.price > acc.priceRange.max) {
        acc.priceRange.max = curr.price
      }

      if (curr.stock < acc.stockRange.min) {
        acc.stockRange.min = curr.stock
      }

      if (curr.stock > acc.stockRange.min) {
        acc.stockRange.max = curr.stock
      }

      return acc
    },
    {
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 0 },
      stockRange: { min: 0, max: 0 }
    } as {
      categories: string[]
      brands: string[]
      priceRange: { min: number; max: number }
      stockRange: { min: number; max: number }
    }
  )
}
