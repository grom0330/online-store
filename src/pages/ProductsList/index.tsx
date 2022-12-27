import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import ProductCard from 'components/ProductCard'

import useProductsList from './useProductsList'
import useCartStore from 'store/cart'

const ProductsList = () => {
  const s = useProductsList()

  const productsInCart = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addItem)
  const removeFromCart = useCartStore((state) => state.removeItem)

  if (s.status === 'loading')
    return (
      <main>
        <Title />
        <Loader />
      </main>
    )

  if (s.status === 'error') {
    return (
      <main>
        <Title />
        <div>{s.error}</div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <Title />

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {s.products.map((product) => (
          <ProductCard
            key={product.id}
            data={product}
            inCart={productsInCart.some((item) => item.id === product.id)}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>
    </main>
  )
}

function Title() {
  return <PageTitle text="Products List" />
}

export default ProductsList
