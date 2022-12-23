import { useEffect, useState } from 'react'

import { Product } from 'dummyjson-api/models'
import PageTitle from 'components/PageTitle'
import { getProducts } from 'dummyjson-api'

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>()

  // TODO: move to the application root
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data.products)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <PageTitle text="Products List" />
      {products && products.map((product) => <div key={product.id}>{product.title}</div>)}
    </div>
  )
}
