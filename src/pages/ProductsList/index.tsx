import { ReactNode } from 'react'

import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import ProductCard from 'components/ProductCard'

import useProductsList from './useProductsList'

function ProductsList() {
  const p = useProductsList()

  if (p.status === 'loading') {
    return (
      <Main>
        <Title />
        <Loader />
      </Main>
    )
  }

  if (p.status === 'error') {
    return (
      <Main>
        <Title />
        <div>{p.error}</div>
      </Main>
    )
  }

  return (
    <Main>
      <Title />

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {p.products.map((product) => (
          <ProductCard
            key={product.id}
            data={product}
            inCart={p.productsInCart.some((item) => item.id === product.id)}
            onAddToCart={p.addToCart}
            onRemoveFromCart={p.removeFromCart}
          />
        ))}
      </div>
    </Main>
  )
}

function Title() {
  return <PageTitle text="Products List" />
}

function Main({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {children}
    </main>
  )
}

export default ProductsList
