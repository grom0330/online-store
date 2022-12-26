import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import useProductsList from './useProductsList'

const ProductsList = () => {
  const s = useProductsList()

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
      {s.products && s.products.map((product) => <div key={product.id}>{product.title}</div>)}
    </>
  )
}

export default ProductsList
