import { useParams } from 'react-router-dom'
import PageTitle from 'components/PageTitle'

export default function ProductDetails() {
  const { id } = useParams()

  return (
    <div>
      <PageTitle text="Product Details" />
      <h3>product id: {id}</h3>
    </div>
  )
}
