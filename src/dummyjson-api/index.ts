import { Products } from './models'

export const getProducts = async () => {
  const result = await fetch('https://dummyjson.com/products?limit=100')
  return (await result.json()) as Products
}
