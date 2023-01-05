import { Products } from './models'

export const getProducts = async () => {
  const resp = await fetch(`https://dummyjson.com/products?limit=20&`)

  if (!resp.ok) {
    throw new Error(resp.statusText)
  }

  return (await resp.json()) as Products
}
