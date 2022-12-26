import { Products } from './models'

export const getProducts = async () => {
  const result = await fetch('https://dummyjson.com/products?limit=100')

  if (!result.ok) {
    throw new Error(result.statusText)
  }

  return (await result.json()) as Products
}
