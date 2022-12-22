import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import PageLayout from 'components/PageLayout'
import ProductsList from 'pages/ProductsList'
import ProductDetails from 'pages/ProductDetails'
import Cart from 'pages/Cart'
import NoMatch from 'pages/NoMatch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<ProductsList />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
