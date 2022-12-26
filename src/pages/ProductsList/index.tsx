import PageTitle from 'components/PageTitle'
import { Product } from 'dummyjson-api/models'

type Props = {
  products: Product[]
}

const ProductsList = (p: Props) => (
  <div>
    <PageTitle text="Products List" />
    {p.products && p.products.map((product) => <div key={product.id}>{product.title}</div>)}
  </div>
)

export default ProductsList
