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
      if (!acc.categories.includes(curr.category)) {
        acc.categories.push(curr.category)
      }

      if (!acc.brands.includes(curr.brand)) {
        acc.brands.push(curr.brand)
      }

      if (curr.price < acc.priceRange[0]) {
        acc.priceRange[0] = curr.price
      }

      if (curr.price > acc.priceRange[1]) {
        acc.priceRange[1] = curr.price
      }

      if (curr.stock < acc.stockRange[0]) {
        acc.stockRange[0] = curr.stock
      }

      if (curr.stock > acc.stockRange[1]) {
        acc.stockRange[1] = curr.stock
      }

      return acc
    },
    { categories: [], brands: [], priceRange: [0, 0], stockRange: [0, 0] } as {
      categories: string[]
      brands: string[]
      priceRange: [number, number]
      stockRange: [number, number]
    }
  )
}
