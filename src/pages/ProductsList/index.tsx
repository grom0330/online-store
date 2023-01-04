import PageTitle from 'components/PageTitle'
import Filters from 'components/Filters'
import Controls from 'components/Controls'
import ProductCard from 'components/ProductCard'

import useProducts from 'store/products'
import { useSearchParams } from 'react-router-dom'

function ProductsList() {
  const products = useProducts((s) => s.products)

  const [search] = useSearchParams()

  const rowClasses = search.get('sm') === 'true' ? '' : 'sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-2'

  return (
    <div className="mx-auto max-w-2xl py-5 px-2 sm:py-10 sm:px-4 lg:max-w-7xl lg:px-6">
      <PageTitle text="Products List" />

      <div className="grid grid-cols-5 grid-rows-1 gap-2">
        <aside aria-label="Sidebar">
          <Filters />
        </aside>

        <div className="col-span-4">
          <Controls />

          <main className={`grid grid-cols-1 gap-y-8 gap-x-2 ${rowClasses}`}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}

            {products.length === 0 && <p>No products found</p>}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
