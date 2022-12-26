import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import { useCartStore } from 'store/cart'
import useProductsList from './useProductsList'

const ProductsList = () => {
  const s = useProductsList()

  const addToCart = useCartStore((state) => state.addItem)
  const removeFromCart = useCartStore((state) => state.removeItem)

  if (s.status === 'loading') {
    return (
      <>
        <PageTitle text="Products List" />
        <Loader />
      </>
    )
  }

  if (s.status === 'error') {
    return (
      <>
        <PageTitle text="Products List" />
        <div>{s.error}</div>
      </>
    )
  }

  return (
    <>
      <PageTitle text="Products List" />
      {s.products &&
        s.products.map((product) => (
          <div key={product.id}>
            <span>{product.title}</span>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded inline-flex items-center"
              onClick={() => addToCart({ id: product.id, price: product.price })}
            >
              +
            </button>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded inline-flex items-center"
              onClick={() => removeFromCart(product.id)}
            >
              -
            </button>
          </div>
        ))}
    </>
  )
}

export default ProductsList
