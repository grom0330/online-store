import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { PageLayout } from 'components/PageLayout'

import ProductsList from 'pages/ProductsList'
import ProductDetails from 'pages/ProductDetails'
import Cart from 'pages/Cart'
import NoMatch from 'pages/NoMatch'

import { ROUTES } from './constants'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.base} element={<PageLayout />}>
          <Route index element={<ProductsList />} />
          <Route path={`${ROUTES.productDetails}/:id`} element={<ProductDetails />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
