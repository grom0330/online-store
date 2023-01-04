import { useEffect } from 'react'
import { Outlet } from 'react-router'
import shallow from 'zustand/shallow'

import Loader from 'components/Loader'
import Header from 'components/Header'
import Footer from 'components/Footer'
import useProducts from 'store/products'

export default function PageLayout() {
  const [status, error, fetchProducts] = useProducts(
    (state) => [state.status, state.error, state.fetch],
    shallow
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Header />
      {status === 'loading' && <Loader />}
      {status === 'error' && <div>{error}</div>}
      {status === 'ok' && <Outlet />}
      <Footer />
    </>
  )
}
