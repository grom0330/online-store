import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Product } from 'dummyjson-api/models'
import { getProducts } from 'dummyjson-api'

import PageLayout from 'components/PageLayout'
import ProductsList from 'pages/ProductsList'
import ProductDetails from 'pages/ProductDetails'
import Cart from 'pages/Cart'
import NoMatch from 'pages/NoMatch'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  // TODO: move to the application root
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data.products)
    }

    fetchProducts()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<ProductsList products={products} />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
