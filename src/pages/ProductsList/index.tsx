import PageTitle from 'components/PageTitle'
import Controls from 'components/Controls'
import ProductCard from 'components/ProductCard'

import useProducts from 'store/products'

function ProductsList() {
  const products = useProducts((s) => s.products)

  return (
    <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <PageTitle text="Products List" />

      <Controls />

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  )
}

export default ProductsList
