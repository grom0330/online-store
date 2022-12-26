import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import PageLayout from 'components/PageLayout'
import ProductsList from 'pages/ProductsList'
import ProductDetails from 'pages/ProductDetails'
import Cart from 'pages/Cart'
import NoMatch from 'pages/NoMatch'

import useApp from 'useApp'

function App() {
  const s = useApp()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            index
            element={
              <ProductsList
                products={s.status === 'ok' ? s.products : []}
                loading={s.status === 'loading'}
              />
            }
          />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
