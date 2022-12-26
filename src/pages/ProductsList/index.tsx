import Loader from 'components/Loader'
import PageTitle from 'components/PageTitle'
import { Product } from 'dummyjson-api/models'

type Props = {
  products?: Product[]
  loading: boolean
}

const ProductsList = (p: Props) => (
  <div>
    <PageTitle text="Products List" />
    {p.loading && <Loader />}
    {p.products && p.products.map((product) => <div key={product.id}>{product.title}</div>)}
  </div>
)

export default ProductsList
